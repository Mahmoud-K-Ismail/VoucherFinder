from flask import Blueprint, request, jsonify
from models.code import db, Code
from datetime import datetime, timedelta
from config import Config

search_bp = Blueprint('search', __name__)

@search_bp.route('/api/codes/search', methods=['GET'])
def search_codes():
    """
    Search for discount codes by brand name
    
    Query params:
        brand: Brand name to search for (required)
        
    Returns:
        JSON array of codes
    """
    brand_name = request.args.get('brand', '').strip()
    
    if not brand_name:
        return jsonify({'error': 'Brand name is required'}), 400
    
    try:
        # Query database for codes
        codes = Code.query.filter(
            Code.brand.ilike(f'%{brand_name}%')
        ).order_by(
            Code.discount_percentage.desc().nullslast(),
            Code.date_found.desc()
        ).all()
        
        # Check if codes are stale (older than cache duration)
        if codes:
            latest_code = max(codes, key=lambda c: c.created_at)
            cache_expiry = datetime.utcnow() - timedelta(hours=Config.CODE_CACHE_DURATION)
            
            if latest_code.created_at < cache_expiry:
                # Codes are stale, trigger scraping
                return jsonify({
                    'codes': [code.to_dict() for code in codes],
                    'stale': True,
                    'message': 'Codes may be outdated. Consider running /api/scrape'
                })
        
        if not codes:
            return jsonify({
                'codes': [],
                'message': f'No codes found for {brand_name}. Try /api/scrape to fetch new codes.'
            })
        
        return jsonify({
            'codes': [code.to_dict() for code in codes],
            'stale': False
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@search_bp.route('/api/codes/copy', methods=['POST'])
def track_copy():
    """
    Track when a user copies a code (for analytics)
    
    Body:
        code_id: ID of the code copied
    """
    try:
        data = request.get_json()
        code_id = data.get('code_id')
        
        if not code_id:
            return jsonify({'error': 'code_id is required'}), 400
        
        code = Code.query.get(code_id)
        if not code:
            return jsonify({'error': 'Code not found'}), 404
        
        # Increment uses count
        code.uses_count += 1
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Code copy tracked',
            'uses_count': code.uses_count
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

