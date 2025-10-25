from flask import Blueprint, request, jsonify
from models.suggestion import AISuggestion
from models.code import db
from ai.suggester import AISuggester
from ai.validator import SuggestionValidator
from datetime import datetime, timedelta
from config import Config

suggestions_bp = Blueprint('suggestions', __name__)

@suggestions_bp.route('/api/suggestions', methods=['GET'])
def get_suggestions():
    """
    Get AI-powered discount suggestions for a brand
    
    Query params:
        brand: Brand name (required)
        
    Returns:
        JSON with AI suggestions
    """
    brand_name = request.args.get('brand', '').strip()
    
    if not brand_name:
        return jsonify({'error': 'Brand name is required'}), 400
    
    try:
        # Check if suggestions exist in cache
        cache_expiry = datetime.utcnow() - timedelta(hours=Config.SUGGESTION_CACHE_DURATION)
        cached_suggestions = AISuggestion.query.filter(
            AISuggestion.brand.ilike(f'%{brand_name}%'),
            AISuggestion.created_at >= cache_expiry
        ).order_by(
            AISuggestion.confidence_score.desc(),
            AISuggestion.estimated_savings.desc().nullslast()
        ).limit(5).all()
        
        if cached_suggestions:
            return jsonify({
                'suggestions': [s.to_dict() for s in cached_suggestions],
                'cached': True
            })
        
        # Generate new suggestions using AI
        ai_suggester = AISuggester()
        raw_suggestions = ai_suggester.get_suggestions(brand_name)
        
        # Validate suggestions
        validated_suggestions = SuggestionValidator.validate_suggestions(raw_suggestions)
        
        # Store in database
        stored_suggestions = []
        for suggestion_data in validated_suggestions:
            new_suggestion = AISuggestion(
                brand=brand_name,
                suggestion_type=suggestion_data.get('type', 'general'),
                title=suggestion_data.get('title', ''),
                description=suggestion_data.get('description', ''),
                estimated_savings=suggestion_data.get('estimated_savings', 0),
                estimated_savings_description=suggestion_data.get('estimated_savings_description', ''),
                conditions=suggestion_data.get('conditions', ''),
                pro_tip=suggestion_data.get('pro_tip', ''),
                confidence_score=50.0,  # Start with neutral confidence
                verification_count=0,
                risk_level=suggestion_data.get('risk', 'safe')
            )
            db.session.add(new_suggestion)
            stored_suggestions.append(new_suggestion)
        
        db.session.commit()
        
        # Return top 3 suggestions
        top_suggestions = sorted(
            stored_suggestions,
            key=lambda s: (s.confidence_score, s.estimated_savings or 0),
            reverse=True
        )[:3]
        
        return jsonify({
            'suggestions': [s.to_dict() for s in top_suggestions],
            'cached': False
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@suggestions_bp.route('/api/suggestions/verify', methods=['POST'])
def verify_suggestion():
    """
    User verifies that a suggestion worked
    
    Body:
        suggestion_id: ID of the suggestion
        worked: Boolean indicating if it worked
    """
    try:
        data = request.get_json()
        suggestion_id = data.get('suggestion_id')
        worked = data.get('worked', True)
        
        if not suggestion_id:
            return jsonify({'error': 'suggestion_id is required'}), 400
        
        suggestion = AISuggestion.query.get(suggestion_id)
        if not suggestion:
            return jsonify({'error': 'Suggestion not found'}), 404
        
        # Increment verification count
        if worked:
            suggestion.verification_count += 1
            # Update confidence score (simple algorithm)
            # Start at 50, increase by 2 for each verification, cap at 100
            suggestion.confidence_score = min(
                100.0,
                50.0 + (suggestion.verification_count * 2)
            )
        else:
            # Decrease confidence if it didn't work
            suggestion.confidence_score = max(
                0.0,
                suggestion.confidence_score - 5
            )
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Verification recorded',
            'confidence_score': suggestion.confidence_score,
            'verification_count': suggestion.verification_count
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

