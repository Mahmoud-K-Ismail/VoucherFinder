# 🔑 API Keys Setup Guide

This guide will help you get the necessary API keys for VoucherFinder.

## Overview

VoucherFinder uses two external APIs:
1. **YouTube Data API** - For scraping discount codes from YouTube videos
2. **OpenAI API** - For generating AI-powered discount suggestions

**Important**: The app will work with mock data if you don't provide API keys! This is perfect for quick demos.

## 1. YouTube Data API Key (Free)

### Why we need it:
YouTube creators often share exclusive discount codes in video descriptions. The YouTube Data API lets us search videos and read descriptions programmatically.

### Cost:
- **FREE** for up to 10,000 queries per day
- More than enough for a demo or MVP

### Setup Steps:

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account
3. Click "Select a Project" → "New Project"
4. Name it "VoucherFinder" (or anything you like)
5. Click "Create"

#### Step 2: Enable YouTube Data API
1. In the search bar, type "YouTube Data API v3"
2. Click on "YouTube Data API v3"
3. Click "Enable"
4. Wait 10-20 seconds for it to activate

#### Step 3: Create API Key
1. Go to "Credentials" (left sidebar)
2. Click "Create Credentials" → "API Key"
3. Copy the API key (looks like: `AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
4. (Optional but recommended) Click "Restrict Key":
   - Application restrictions: None
   - API restrictions: Select "YouTube Data API v3"
   - Click "Save"

#### Step 4: Add to .env
Open `backend/.env` and paste your key:
```env
YOUTUBE_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Testing:
Search for "NordVPN" in the app. If you see codes with source "YouTube", it's working!

### Troubleshooting:
- **"API key not valid"**: Make sure you enabled YouTube Data API v3
- **"Quota exceeded"**: You've hit the 10k/day limit (unlikely for demo)
- **No results**: The API is working, there just aren't codes for that brand

## 2. Google Gemini API (FREE! 🎉)

### Why we need it:
Google's Gemini AI generates smart discount suggestions like "wait for Black Friday" or "use student discount" that go beyond traditional coupon codes.

### Cost:
- ✅ **FREE** with generous limits!
- 60 requests per minute
- 1,500 requests per day
- No credit card required for free tier
- Perfect for demos and development

### Setup Steps:

#### Step 1: Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Select a Google Cloud project (or create new one)
5. Copy the API key (looks like: `AIzaSyC-...`)

#### Step 2: Add to .env
Open `backend/.env` and paste your key:
```env
GEMINI_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Testing:
Search for any brand in the app. If you see "💡 AI Suggestion: Smart Ways to Save", it's working!

### Troubleshooting:
- **"Invalid API key"**: Make sure you copied the full key (starts with `AIzaSy`)
- **"Quota exceeded"**: You've hit rate limits (60/min, 1500/day)
- **No suggestions**: Check backend logs for errors

### Rate Limits:
Gemini Free Tier:
- 60 requests per minute (RPM)
- 1,500 requests per day (RPD)
- More than enough for demos and small-scale usage

## Alternative: Use Mock Data (Free!)

Don't want to set up API keys right now? No problem!

The app includes mock data for popular brands:
- Amazon Prime
- NordVPN
- Spotify
- Skillshare

Just leave the API keys blank in `.env` and search for these brands. Perfect for demos!

## Summary

| API | Required? | Cost | Setup Time | Purpose |
|-----|-----------|------|------------|---------|
| YouTube Data API | Optional | Free | 5 minutes | Scrape YouTube codes |
| Google Gemini API | Optional | Free | 3 minutes | AI suggestions |
| Mock Data | Built-in | Free | 0 minutes | Demo without APIs |

## Quick Start Recommendations

### For Quick Demo (0 minutes):
- Use mock data (no API keys needed)
- Search: "Amazon Prime", "NordVPN", "Spotify"

### For Full Demo (8 minutes):
- Set up YouTube API (5 min) - Free!
- Set up Gemini API (3 min) - Free!
- Search any brand

### For Production:
- Both APIs required
- Set up usage monitoring
- Consider caching to reduce API calls

## Security Notes

⚠️ **Never commit API keys to git!**
- ✅ Keys should only be in `.env` (which is gitignored)
- ❌ Don't paste keys in code files
- ❌ Don't share keys publicly

✅ **Best Practices:**
- Rotate keys periodically
- Set usage limits
- Use different keys for dev/production
- Store production keys in environment variables (not in files)

## Need Help?

- **YouTube API Issues**: [Google Cloud Support](https://support.google.com/googleapi)
- **OpenAI API Issues**: [OpenAI Help Center](https://help.openai.com)
- **General Questions**: Check `SETUP_GUIDE.md` or `README.md`

---

Happy coding! 🚀

