from flask import Blueprint, request, jsonify
from models.code import db, Code
from scrapers.youtube_scraper import YouTubeScraper
from scrapers.coupon_scraper import CouponScraper
from datetime import datetime

scrape_bp = Blueprint('scrape', __name__)

@scrape_bp.route('/api/scrape', methods=['GET'])
def scrape_codes():
    """
    Scrape codes from multiple sources for a brand
    
    Query params:
        brand: Brand name to scrape for (required)
        
    Returns:
        JSON with scraped codes
    """
    brand_name = request.args.get('brand', '').strip()
    
    if not brand_name:
        return jsonify({'error': 'Brand name is required'}), 400
    
    try:
        all_codes = []
        
        # Scrape YouTube
        youtube_scraper = YouTubeScraper()
        youtube_codes = youtube_scraper.scrape_codes(brand_name)
        all_codes.extend(youtube_codes)
        
        # Scrape coupon sites
        coupon_scraper = CouponScraper()
        coupon_codes = coupon_scraper.scrape_codes(brand_name)
        all_codes.extend(coupon_codes)
        
        # Store codes in database
        stored_codes = []
        for code_data in all_codes:
            # Check if code already exists
            existing_code = Code.query.filter_by(code=code_data['code']).first()
            
            if existing_code:
                # Update existing code
                existing_code.brand = brand_name
                existing_code.discount_percentage = code_data.get('discount_percentage')
                existing_code.discount_description = code_data.get('discount_description')
                existing_code.source = code_data['source']
                existing_code.source_url = code_data.get('source_url')
                existing_code.source_creator = code_data.get('source_creator')
                existing_code.status = code_data.get('status', 'unverified')
                existing_code.date_found = code_data.get('date_found', datetime.utcnow())
                existing_code.uses_count = code_data.get('uses_count', 0)
                stored_codes.append(existing_code)
            else:
                # Create new code
                new_code = Code(
                    brand=brand_name,
                    code=code_data['code'],
                    discount_percentage=code_data.get('discount_percentage'),
                    discount_description=code_data.get('discount_description'),
                    source=code_data['source'],
                    source_url=code_data.get('source_url'),
                    source_creator=code_data.get('source_creator'),
                    status=code_data.get('status', 'unverified'),
                    date_found=code_data.get('date_found', datetime.utcnow()),
                    uses_count=code_data.get('uses_count', 0)
                )
                db.session.add(new_code)
                stored_codes.append(new_code)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Scraped {len(stored_codes)} codes for {brand_name}',
            'codes': [code.to_dict() for code in stored_codes]
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

