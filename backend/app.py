from flask import Flask, jsonify
from flask_cors import CORS
from models.code import db
from routes.search import search_bp
from routes.scrape import scrape_bp
from routes.suggestions import suggestions_bp
from config import Config
import os

def create_app():
    """Create and configure Flask application"""
    app = Flask(__name__)
    
    # Configuration
    app.config.from_object(Config)
    
    # Enable CORS for frontend (development + production)
    allowed_origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        os.getenv("FRONTEND_URL", ""),  # Production frontend URL
    ]
    # Remove empty strings
    allowed_origins = [origin for origin in allowed_origins if origin]
    
    CORS(app, resources={
        r"/api/*": {
            "origins": allowed_origins if allowed_origins else "*",  # Allow all if no specific origins
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(search_bp)
    app.register_blueprint(scrape_bp)
    app.register_blueprint(suggestions_bp)
    
    # Create tables
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'message': 'Voucher Scraper API is running'
        })
    
    # Root endpoint
    @app.route('/', methods=['GET'])
    def root():
        return jsonify({
            'name': 'Voucher Scraper API',
            'version': '1.0.0',
            'endpoints': {
                'search': '/api/codes/search?brand=<brand_name>',
                'scrape': '/api/scrape?brand=<brand_name>',
                'suggestions': '/api/suggestions?brand=<brand_name>',
                'copy_tracking': '/api/codes/copy',
                'verify_suggestion': '/api/suggestions/verify',
                'health': '/api/health'
            }
        })
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = Config.FLASK_PORT
    print(f"\n🚀 Voucher Scraper API starting on http://localhost:{port}")
    print(f"📝 API documentation available at http://localhost:{port}/")
    print(f"💡 Frontend should run on http://localhost:3000\n")
    app.run(debug=True, host='0.0.0.0', port=port)

