from typing import Dict, List

class SuggestionValidator:
    """Validate AI-generated suggestions for safety and legality"""
    
    # Keywords that might indicate risky or illegal suggestions
    RISKY_KEYWORDS = [
        'fake', 'stolen', 'hack', 'crack', 'pirate', 'illegal',
        'fraud', 'scam', 'cheat', 'exploit', 'abuse', 'violate',
        'bypass payment', 'skip payment', 'avoid paying'
    ]
    
    # Safe suggestion types
    SAFE_TYPES = {
        'new_account_trial', 'student_discount', 'referral',
        'seasonal_sale', 'family_plan', 'annual_plan',
        'benefit_stacking', 'long_term_plan', 'free_trial'
    }
    
    @classmethod
    def validate_suggestion(cls, suggestion: Dict) -> Dict:
        """
        Validate a single suggestion
        
        Args:
            suggestion: Suggestion dict to validate
            
        Returns:
            Validated suggestion dict with risk assessment
        """
        # Check for risky content
        risk_level = cls._assess_risk(suggestion)
        suggestion['risk'] = risk_level
        
        # Mark as safe if passes validation
        suggestion['is_safe'] = risk_level == 'safe'
        
        return suggestion
    
    @classmethod
    def validate_suggestions(cls, suggestions: List[Dict]) -> List[Dict]:
        """
        Validate a list of suggestions
        
        Args:
            suggestions: List of suggestion dicts
            
        Returns:
            List of validated suggestions (only safe ones)
        """
        validated = []
        
        for suggestion in suggestions:
            validated_suggestion = cls.validate_suggestion(suggestion)
            
            # Only include safe suggestions in MVP
            if validated_suggestion.get('is_safe', False):
                validated.append(validated_suggestion)
        
        return validated
    
    @classmethod
    def _assess_risk(cls, suggestion: Dict) -> str:
        """
        Assess risk level of suggestion
        
        Returns:
            'safe', 'medium', or 'high'
        """
        # Check type
        suggestion_type = suggestion.get('type', '').lower()
        if suggestion_type in cls.SAFE_TYPES:
            risk = 'safe'
        else:
            risk = 'medium'
        
        # Check for risky keywords in description and title
        text = (
            suggestion.get('description', '') + ' ' +
            suggestion.get('title', '') + ' ' +
            suggestion.get('pro_tip', '')
        ).lower()
        
        for keyword in cls.RISKY_KEYWORDS:
            if keyword in text:
                return 'high'
        
        return risk
    
    @classmethod
    def filter_safe_suggestions(cls, suggestions: List[Dict]) -> List[Dict]:
        """
        Filter to only return safe suggestions
        
        Args:
            suggestions: List of suggestions
            
        Returns:
            List of safe suggestions only
        """
        return [s for s in suggestions if s.get('risk', 'high') == 'safe']

