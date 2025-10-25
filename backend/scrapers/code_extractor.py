import re
from typing import List, Dict, Optional

class CodeExtractor:
    """Extract discount codes from text using regex patterns"""
    
    # Common patterns for discount codes
    PATTERNS = [
        r'(?:use\s+code|promo\s+code|coupon\s+code|discount\s+code)[:\s]+([A-Z0-9]{4,20})',
        r'CODE[:\s]+([A-Z0-9]{4,20})',
        r'PROMO[:\s]+([A-Z0-9]{4,20})',
        r'COUPON[:\s]+([A-Z0-9]{4,20})',
        r'(?:with|using)\s+([A-Z0-9]{4,20})\s+(?:at\s+checkout|for\s+discount)',
        r'"([A-Z0-9]{4,20})"\s+(?:at\s+checkout|for\s+\d+%)',
    ]
    
    # Discount percentage patterns
    DISCOUNT_PATTERNS = [
        r'(\d+)%\s+off',
        r'save\s+(\d+)%',
        r'(\d+)\s+percent\s+off',
    ]
    
    @classmethod
    def extract_codes_from_text(cls, text: str) -> List[str]:
        """
        Extract potential discount codes from text
        
        Args:
            text: Text to search for codes
            
        Returns:
            List of extracted codes (uppercase, deduplicated)
        """
        if not text:
            return []
        
        codes = set()
        text_upper = text.upper()
        
        for pattern in cls.PATTERNS:
            matches = re.finditer(pattern, text_upper, re.IGNORECASE)
            for match in matches:
                code = match.group(1).strip()
                # Filter out common false positives
                if cls._is_valid_code(code):
                    codes.add(code)
        
        return list(codes)
    
    @classmethod
    def extract_discount_percentage(cls, text: str) -> Optional[float]:
        """
        Extract discount percentage from text
        
        Args:
            text: Text to search for discount percentage
            
        Returns:
            Discount percentage as float, or None if not found
        """
        if not text:
            return None
        
        for pattern in cls.DISCOUNT_PATTERNS:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                try:
                    return float(match.group(1))
                except (ValueError, IndexError):
                    continue
        
        return None
    
    @classmethod
    def _is_valid_code(cls, code: str) -> bool:
        """
        Check if extracted code is likely valid
        
        Args:
            code: Potential discount code
            
        Returns:
            True if code passes validation checks
        """
        if not code or len(code) < 4 or len(code) > 20:
            return False
        
        # Filter out common false positives
        false_positives = {
            'HTTP', 'HTTPS', 'HTML', 'CODE', 'PROMO', 'COUPON',
            'LINK', 'VIDEO', 'DESCRIPTION', 'SUBSCRIBE', 'LIKE',
            'FOLLOW', 'SHARE', 'COMMENT', 'BELOW', 'ABOVE'
        }
        
        if code in false_positives:
            return False
        
        # Code should have at least one letter and one number
        has_letter = any(c.isalpha() for c in code)
        has_number = any(c.isdigit() for c in code)
        
        # Accept if it has both, or if it's all letters (some codes are like that)
        return (has_letter and has_number) or (has_letter and len(code) >= 5)
    
    @classmethod
    def extract_code_info(cls, text: str) -> List[Dict[str, any]]:
        """
        Extract codes with associated discount information
        
        Args:
            text: Text to parse
            
        Returns:
            List of dicts with 'code' and 'discount_percentage' keys
        """
        codes = cls.extract_codes_from_text(text)
        discount_pct = cls.extract_discount_percentage(text)
        
        result = []
        for code in codes:
            result.append({
                'code': code,
                'discount_percentage': discount_pct,
                'raw_text': text[:200]  # First 200 chars for context
            })
        
        return result

