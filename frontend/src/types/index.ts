export interface Code {
  id: number;
  brand: string;
  code: string;
  discount_percentage: number | null;
  discount_description: string | null;
  source: string;
  source_url: string | null;
  source_creator: string | null;
  status: 'verified' | 'unverified' | 'expired';
  date_found: string;
  expiry_date: string | null;
  uses_count: number;
  created_at: string;
}

export interface AISuggestion {
  id: number;
  brand: string;
  suggestion_type: string;
  title: string;
  description: string;
  estimated_savings: number | null;
  estimated_savings_description: string | null;
  conditions: string | null;
  pro_tip: string | null;
  confidence_score: number;
  verification_count: number;
  risk_level: 'safe' | 'medium' | 'high';
  created_at: string;
}

export interface SearchResponse {
  codes: Code[];
  stale?: boolean;
  message?: string;
}

export interface SuggestionsResponse {
  suggestions: AISuggestion[];
  cached: boolean;
}

export interface ScrapeResponse {
  success: boolean;
  message: string;
  codes: Code[];
}

