import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Application configuration"""
    YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY', '')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///codes.db')
    FLASK_PORT = int(os.getenv('FLASK_PORT', 5000))
    
    # SQLAlchemy settings
    SQLALCHEMY_DATABASE_URI = 'sqlite:///codes.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Cache settings (in hours)
    CODE_CACHE_DURATION = 24  # Refresh codes after 24 hours
    SUGGESTION_CACHE_DURATION = 168  # Refresh AI suggestions after 7 days (168 hours)
    
    # API rate limits
    MAX_YOUTUBE_RESULTS = 30
    MAX_COUPON_RESULTS = 20

