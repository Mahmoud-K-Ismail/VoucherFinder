import json
from typing import List, Dict
import google.generativeai as genai
from config import Config

class AISuggester:
    """Generate AI-powered discount suggestions using Google Gemini"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or Config.GEMINI_API_KEY
        self.model = None
        if self.api_key:
            genai.configure(api_key=self.api_key)
            # Use gemini-2.5-flash (free tier, fast and latest)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def get_suggestions(self, brand_name: str) -> List[Dict]:
        """
        Get AI-generated discount suggestions for a brand
        
        Args:
            brand_name: Brand to get suggestions for
            
        Returns:
            List of suggestion dicts
        """
        if not self.model:
            print("Warning: Gemini API key not configured. Returning mock suggestions.")
            return self._get_mock_suggestions(brand_name)
        
        try:
            prompt = self._build_prompt(brand_name)
            
            print(f"[AI] Generating suggestions for: {brand_name}")
            response = self.model.generate_content(prompt)
            content = response.text
            print(f"[AI] Gemini response length: {len(content)} chars")
            print(f"[AI] First 200 chars: {content[:200]}")
            
            suggestions = self._parse_ai_response(content)
            
            # If AI returned empty or failed to parse, use mock suggestions as fallback
            if not suggestions or len(suggestions) == 0:
                print(f"[AI] ⚠️  No valid suggestions parsed for {brand_name}, using mock data")
                return self._get_mock_suggestions(brand_name)
            
            print(f"[AI] ✅ Successfully generated {len(suggestions)} AI suggestions!")
            return suggestions
        
        except Exception as e:
            print(f"[AI] ❌ Error getting AI suggestions: {e}")
            return self._get_mock_suggestions(brand_name)
    
    def _build_prompt(self, brand_name: str) -> str:
        """Build prompt for AI model"""
        return f"""You are a discount expert. For the service/product "{brand_name}", provide EXACTLY 3-5 legitimate ways users can get the best deals or free access.

ALWAYS include these types if applicable:
1. Free trial for new accounts
2. Student discount (with .edu email)
3. Family/group plan sharing
4. Seasonal sales (Black Friday, etc.)
5. Referral programs

For EACH suggestion, provide ALL fields:
- type: "new_account_trial", "student_discount", "family_plan", "seasonal_sale", "referral", etc.
- title: Short descriptive title
- description: How it works (2-3 sentences)
- estimated_savings: Numeric value (e.g., 14.99)
- estimated_savings_description: Text like "$14.99 for first month" or "50% off annually"
- conditions: Requirements (e.g., "First-time users only" or "Requires .edu email")
- pro_tip: Extra advice to maximize savings
- risk: ALWAYS use "safe" for legitimate strategies

CRITICAL: Return ONLY valid JSON in this EXACT format (no extra text):
{{
  "suggestions": [
    {{
      "type": "new_account_trial",
      "title": "Free Trial for New Users",
      "description": "Get 30 days completely free when you sign up. Cancel anytime before trial ends.",
      "estimated_savings": 15.99,
      "estimated_savings_description": "$15.99 for first month",
      "conditions": "New customers only",
      "pro_tip": "Set a calendar reminder 2 days before trial ends",
      "risk": "safe"
    }},
    {{
      "type": "student_discount",
      "title": "Student Discount - 50% Off",
      "description": "Students with .edu email get 50% off. Verify through student portal.",
      "estimated_savings": 7.99,
      "estimated_savings_description": "$7.99/month vs $15.99 regular",
      "conditions": "Valid .edu email required",
      "pro_tip": "Works for recent graduates too (check eligibility period)",
      "risk": "safe"
    }}
  ]
}}

Only suggest legal, ethical strategies. No hacks or exploits. Focus on official promotions."""
    
    def _parse_ai_response(self, content: str) -> List[Dict]:
        """Parse AI response into structured suggestions"""
        try:
            # Try to extract JSON from response
            start = content.find('{')
            end = content.rfind('}') + 1
            if start >= 0 and end > start:
                json_str = content[start:end]
                data = json.loads(json_str)
                return data.get('suggestions', [])
        except Exception as e:
            print(f"Error parsing AI response: {e}")
        
        return []
    
    def _get_mock_suggestions(self, brand_name: str) -> List[Dict]:
        """Return mock suggestions for demo purposes"""
        mock_suggestions = {
            'amazon prime': [
                {
                    'type': 'new_account_trial',
                    'title': 'New Account Free Trial',
                    'description': 'Create a new Amazon account and get 30 days of Prime completely free. No credit card required upfront. Cancel anytime before the trial ends to avoid charges.',
                    'estimated_savings': 14.99,
                    'estimated_savings_description': '$14.99 for first month',
                    'conditions': 'First-time Amazon Prime users only. One trial per person.',
                    'pro_tip': 'Time your trial for busy shopping periods (holidays, Prime Day) to maximize value.',
                    'risk': 'safe'
                },
                {
                    'type': 'student_discount',
                    'title': 'Student Discount - 50% Off',
                    'description': 'Students with a valid .edu email address get Prime for 50% off ($7.49/month or $69/year instead of $139/year). Includes all standard Prime benefits plus exclusive student deals.',
                    'estimated_savings': 7.50,
                    'estimated_savings_description': '$7.50/month savings',
                    'conditions': 'Must have valid .edu email address and verify student status.',
                    'pro_tip': 'Also includes 6 months free trial before the discounted rate kicks in.',
                    'risk': 'safe'
                },
                {
                    'type': 'benefit_stacking',
                    'title': 'Share Prime Benefits',
                    'description': 'One Prime membership can be shared with up to 4 family members in your household. Split the cost to reduce per-person expense significantly.',
                    'estimated_savings': 11.24,
                    'estimated_savings_description': '$11.24/month when split 4 ways',
                    'conditions': 'Family members must be added to your Amazon Household.',
                    'pro_tip': 'Combine with student discount for even better value when sharing.',
                    'risk': 'safe'
                }
            ],
            'nordvpn': [
                {
                    'type': 'seasonal_sale',
                    'title': 'Wait for Black Friday/Cyber Monday',
                    'description': 'NordVPN typically offers 65-70% discounts during Black Friday and Cyber Monday sales. These are their deepest discounts of the year, often including extra months free.',
                    'estimated_savings': 233.00,
                    'estimated_savings_description': '$233 over 2 years vs regular price',
                    'conditions': 'Sales only available during specific periods (late November).',
                    'pro_tip': 'Sign up for their email list to get early access to Black Friday deals.',
                    'risk': 'safe'
                },
                {
                    'type': 'long_term_plan',
                    'title': 'Choose 2-Year Plan',
                    'description': 'The 2-year plan costs 60-65% less per month than the monthly plan ($3.29/month vs $11.99/month). Pays for itself in 7 months compared to monthly billing.',
                    'estimated_savings': 8.70,
                    'estimated_savings_description': '$8.70/month vs monthly plan',
                    'conditions': 'Must commit to 2-year term. 30-day money-back guarantee available.',
                    'pro_tip': 'Combine with seasonal promotions to get an even better deal on the 2-year plan.',
                    'risk': 'safe'
                }
            ],
            'spotify': [
                {
                    'type': 'new_account_trial',
                    'title': 'Free Trial - 3 Months',
                    'description': 'New Spotify Premium users get 3 months completely free. Full access to ad-free music, offline downloads, and unlimited skips.',
                    'estimated_savings': 29.97,
                    'estimated_savings_description': '$29.97 (3 months free)',
                    'conditions': 'New Premium subscribers only. Credit card required.',
                    'pro_tip': 'Cancel before trial ends to avoid charges, or switch to family plan for better value.',
                    'risk': 'safe'
                },
                {
                    'type': 'student_discount',
                    'title': 'Student Plan - 50% Off',
                    'description': 'Students get Spotify Premium for $4.99/month (50% off regular price). Also includes Hulu and SHOWTIME at no extra cost.',
                    'estimated_savings': 5.00,
                    'estimated_savings_description': '$5/month savings',
                    'conditions': 'Must verify student status with SheerID. Re-verify annually.',
                    'pro_tip': 'With bundled Hulu + SHOWTIME, actual value is $25+/month for just $4.99.',
                    'risk': 'safe'
                },
                {
                    'type': 'family_plan',
                    'title': 'Family Plan Split',
                    'description': 'Spotify Family costs $15.99/month for up to 6 accounts. Split with 5 friends to pay just $2.67/person/month instead of $9.99 each.',
                    'estimated_savings': 7.32,
                    'estimated_savings_description': '$7.32/month when split 6 ways',
                    'conditions': 'All members must share the same address (verification may be required).',
                    'pro_tip': 'Coordinate with roommates or family members for legitimate address sharing.',
                    'risk': 'safe'
                }
            ],
            'skillshare': [
                {
                    'type': 'free_trial',
                    'title': 'Free 30-Day Trial',
                    'description': 'Get complete access to all Skillshare classes for 30 days free. No commitment required, cancel anytime.',
                    'estimated_savings': 13.99,
                    'estimated_savings_description': '$13.99 for first month',
                    'conditions': 'New users only. Credit card required.',
                    'pro_tip': 'Download course materials during trial for offline access.',
                    'risk': 'safe'
                },
                {
                    'type': 'annual_plan',
                    'title': 'Annual Plan Discount',
                    'description': 'Pay annually ($168/year) instead of monthly to save 40% ($99/year when on sale). Works out to $8.25/month vs $13.99.',
                    'estimated_savings': 5.74,
                    'estimated_savings_description': '$5.74/month vs monthly plan',
                    'conditions': 'Must pay full year upfront.',
                    'pro_tip': 'Watch for promotional periods where annual plans drop to $99 or less.',
                    'risk': 'safe'
                }
            ]
        }
        
        # Return brand-specific suggestions, or generic strategies that work for most services
        return mock_suggestions.get(brand_name.lower(), [
            {
                'type': 'new_account_trial',
                'title': 'Free Trial for New Accounts',
                'description': f'Check if {brand_name} offers a free trial period for new users. Most services provide 7-30 days free to test their platform. Cancel before the trial ends if not satisfied.',
                'estimated_savings': 15.00,
                'estimated_savings_description': '$10-20 for trial period',
                'conditions': 'New users only, credit card may be required',
                'pro_tip': 'Set a calendar reminder 2 days before trial ends to avoid charges',
                'risk': 'safe'
            },
            {
                'type': 'student_discount',
                'title': 'Student Discount',
                'description': f'Many services including {brand_name} offer student discounts (typically 25-50% off) with a valid .edu email address. Check their website for student pricing.',
                'estimated_savings': 5.00,
                'estimated_savings_description': '25-50% off regular price',
                'conditions': 'Valid .edu email or student ID required',
                'pro_tip': 'Some services also offer discounts to teachers, military, and non-profits',
                'risk': 'safe'
            },
            {
                'type': 'seasonal_sale',
                'title': 'Wait for Seasonal Sales',
                'description': f'Look for {brand_name} during Black Friday, Cyber Monday, or end-of-year sales. Companies often offer their deepest discounts during these periods (30-70% off).',
                'estimated_savings': 20.00,
                'estimated_savings_description': '30-70% off during sales',
                'conditions': 'Sales typically in November-December',
                'pro_tip': 'Sign up for their email list to get early access to sales',
                'risk': 'safe'
            },
            {
                'type': 'referral',
                'title': 'Referral Programs',
                'description': f'Check if {brand_name} has a referral program. Both you and the referrer often get discounts or credits when you sign up through a referral link.',
                'estimated_savings': 10.00,
                'estimated_savings_description': '$5-15 credit or discount',
                'conditions': 'Need referral link from existing user',
                'pro_tip': 'Search online forums or social media for referral links',
                'risk': 'safe'
            }
        ])

