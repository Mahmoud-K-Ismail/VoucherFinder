from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from typing import List, Dict
from config import Config
from scrapers.code_extractor import CodeExtractor
from datetime import datetime

class YouTubeScraper:
    """Scrape discount codes from YouTube video descriptions"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or Config.YOUTUBE_API_KEY
        self.youtube = None
        if self.api_key:
            self.youtube = build('youtube', 'v3', developerKey=self.api_key)
    
    def scrape_codes(self, brand_name: str, max_results: int = 30) -> List[Dict]:
        """
        Search YouTube for discount codes for a brand
        
        Args:
            brand_name: Brand to search for
            max_results: Maximum number of videos to check
            
        Returns:
            List of dicts containing code information
        """
        if not self.youtube:
            print("Warning: YouTube API key not configured. Returning mock data.")
            return self._get_mock_data(brand_name)
        
        try:
            # Search for videos containing discount codes
            search_queries = [
                f"{brand_name} discount code",
                f"{brand_name} coupon code",
                f"{brand_name} promo code"
            ]
            
            all_codes = []
            seen_codes = set()
            
            for query in search_queries:
                codes = self._search_videos(query, max_results // len(search_queries))
                for code_info in codes:
                    code = code_info['code']
                    if code not in seen_codes:
                        seen_codes.add(code)
                        all_codes.append(code_info)
            
            return all_codes
        
        except HttpError as e:
            print(f"YouTube API error: {e}")
            return []
        except Exception as e:
            print(f"Error scraping YouTube: {e}")
            return []
    
    def _search_videos(self, query: str, max_results: int) -> List[Dict]:
        """Search for videos and extract codes from descriptions"""
        try:
            # Search for videos
            search_response = self.youtube.search().list(
                q=query,
                part='id,snippet',
                maxResults=max_results,
                type='video',
                order='relevance'
            ).execute()
            
            codes = []
            
            for item in search_response.get('items', []):
                video_id = item['id']['videoId']
                snippet = item['snippet']
                
                # Get full video details including description
                video_response = self.youtube.videos().list(
                    id=video_id,
                    part='snippet,statistics'
                ).execute()
                
                if not video_response.get('items'):
                    continue
                
                video_data = video_response['items'][0]
                description = video_data['snippet'].get('description', '')
                title = video_data['snippet'].get('title', '')
                channel_name = video_data['snippet'].get('channelTitle', '')
                published_at = video_data['snippet'].get('publishedAt', '')
                
                # Extract codes from description
                extracted = CodeExtractor.extract_code_info(description + ' ' + title)
                
                for code_data in extracted:
                    codes.append({
                        'code': code_data['code'],
                        'discount_percentage': code_data['discount_percentage'],
                        'source': 'YouTube',
                        'source_url': f'https://www.youtube.com/watch?v={video_id}',
                        'source_creator': channel_name,
                        'status': 'unverified',
                        'date_found': self._parse_youtube_date(published_at)
                    })
            
            return codes
        
        except Exception as e:
            print(f"Error searching videos: {e}")
            return []
    
    def _parse_youtube_date(self, date_str: str) -> datetime:
        """Parse YouTube date format"""
        try:
            return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        except:
            return datetime.utcnow()
    
    def _get_mock_data(self, brand_name: str) -> List[Dict]:
        """Return mock data for demo purposes when API key is not available"""
        mock_codes = {
            'amazon prime': [
                {
                    'code': 'PRIME30',
                    'discount_percentage': 30.0,
                    'source': 'YouTube',
                    'source_url': 'https://www.youtube.com/watch?v=demo',
                    'source_creator': 'Tech Deals',
                    'status': 'verified',
                    'date_found': datetime.utcnow()
                }
            ],
            'nordvpn': [
                {
                    'code': 'SAVE20',
                    'discount_percentage': 20.0,
                    'source': 'YouTube',
                    'source_url': 'https://www.youtube.com/watch?v=demo',
                    'source_creator': 'TechLinked',
                    'status': 'verified',
                    'date_found': datetime.utcnow()
                }
            ],
            'spotify': [
                {
                    'code': 'STUDENT50',
                    'discount_percentage': 50.0,
                    'source': 'YouTube',
                    'source_url': 'https://www.youtube.com/watch?v=demo',
                    'source_creator': 'Music Deals',
                    'status': 'verified',
                    'date_found': datetime.utcnow()
                }
            ]
        }
        
        return mock_codes.get(brand_name.lower(), [])

