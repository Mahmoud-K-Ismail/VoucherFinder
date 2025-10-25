from datetime import datetime
from models.code import db

class AISuggestion(db.Model):
    """Model for AI-generated discount suggestions"""
    __tablename__ = 'ai_suggestions'
    
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(100), nullable=False, index=True)
    suggestion_type = db.Column(db.String(50), nullable=False)  # "new_account", "student_discount", etc.
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    estimated_savings = db.Column(db.Float, nullable=True)
    estimated_savings_description = db.Column(db.String(200), nullable=True)
    conditions = db.Column(db.Text, nullable=True)  # Requirements
    pro_tip = db.Column(db.Text, nullable=True)
    confidence_score = db.Column(db.Float, default=0.0)  # 0-100
    verification_count = db.Column(db.Integer, default=0)  # How many users verified
    risk_level = db.Column(db.String(20), default='safe')  # "safe", "medium", "high"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'brand': self.brand,
            'suggestion_type': self.suggestion_type,
            'title': self.title,
            'description': self.description,
            'estimated_savings': self.estimated_savings,
            'estimated_savings_description': self.estimated_savings_description,
            'conditions': self.conditions,
            'pro_tip': self.pro_tip,
            'confidence_score': self.confidence_score,
            'verification_count': self.verification_count,
            'risk_level': self.risk_level,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<AISuggestion {self.title} for {self.brand}>'

