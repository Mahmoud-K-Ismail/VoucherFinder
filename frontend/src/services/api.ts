import axios from 'axios';
import type { SearchResponse, SuggestionsResponse, ScrapeResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchCodes = async (brand: string): Promise<SearchResponse> => {
  const response = await api.get(`/api/codes/search`, {
    params: { brand },
  });
  return response.data;
};

export const scrapeCodes = async (brand: string): Promise<ScrapeResponse> => {
  const response = await api.get(`/api/scrape`, {
    params: { brand },
  });
  return response.data;
};

export const getSuggestions = async (brand: string): Promise<SuggestionsResponse> => {
  const response = await api.get(`/api/suggestions`, {
    params: { brand },
  });
  return response.data;
};

export const trackCodeCopy = async (codeId: number): Promise<void> => {
  await api.post(`/api/codes/copy`, { code_id: codeId });
};

export const verifySuggestion = async (
  suggestionId: number,
  worked: boolean
): Promise<void> => {
  await api.post(`/api/suggestions/verify`, {
    suggestion_id: suggestionId,
    worked,
  });
};

export const healthCheck = async (): Promise<{ status: string }> => {
  const response = await api.get(`/api/health`);
  return response.data;
};

export default api;

