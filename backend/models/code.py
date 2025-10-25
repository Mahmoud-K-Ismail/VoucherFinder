from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Code(db.Model):
    """Model for discount codes"""
    __tablename__ = 'codes'
    
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(100), nullable=False, index=True)
    code = db.Column(db.String(50), unique=True, nullable=False)
    discount_percentage = db.Column(db.Float, nullable=True)
    discount_description = db.Column(db.String(200), nullable=True)
    source = db.Column(db.String(50), nullable=False)  # "YouTube", "RetailMeNot", "Reddit", etc.
    source_url = db.Column(db.String(500), nullable=True)
    source_creator = db.Column(db.String(100), nullable=True)  # YouTuber name, etc.
    status = db.Column(db.String(20), default='unverified')  # "verified", "unverified", "expired"
    date_found = db.Column(db.DateTime, default=datetime.utcnow)
    expiry_date = db.Column(db.Date, nullable=True)
    uses_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'brand': self.brand,
            'code': self.code,
            'discount_percentage': self.discount_percentage,
            'discount_description': self.discount_description,
            'source': self.source,
            'source_url': self.source_url,
            'source_creator': self.source_creator,
            'status': self.status,
            'date_found': self.date_found.isoformat() if self.date_found else None,
            'expiry_date': self.expiry_date.isoformat() if self.expiry_date else None,
            'uses_count': self.uses_count,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Code {self.code} for {self.brand}>'

