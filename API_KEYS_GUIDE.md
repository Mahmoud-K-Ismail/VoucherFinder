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

## 2. OpenAI API Key (Paid - ~$5-20 for testing)

### Why we need it:
OpenAI's GPT-4 generates smart discount suggestions like "wait for Black Friday" or "use student discount" that go beyond traditional coupon codes.

### Cost:
- **Pay as you go** (credit card required)
- ~$0.03 per AI suggestion generated
- $5-10 credit should cover 100+ demo searches
- New accounts often get $5 free credit

### Setup Steps:

#### Step 1: Create OpenAI Account
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Add payment method (or use free credits if available)

#### Step 2: Create API Key
1. Click your profile picture (top right)
2. Select "API Keys"
3. Click "Create new secret key"
4. Name it "VoucherFinder"
5. Copy the key (starts with `sk-...`)
   - ⚠️ **Important**: Copy it now! You won't be able to see it again

#### Step 3: Add to .env
Open `backend/.env` and paste your key:
```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Testing:
Search for any brand in the app. If you see "💡 AI Suggestion: Smart Ways to Save", it's working!

### Troubleshooting:
- **"Invalid API key"**: Make sure you copied the full key (starts with `sk-`)
- **"Insufficient quota"**: Add credits to your OpenAI account
- **No suggestions**: Check backend logs for errors

### Cost Management:
Set usage limits in OpenAI dashboard:
1. Go to "Usage" → "Limits"
2. Set monthly budget (e.g., $10)
3. You'll get email alerts when approaching limit

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
| OpenAI API | Optional | ~$5-20 | 3 minutes | AI suggestions |
| Mock Data | Built-in | Free | 0 minutes | Demo without APIs |

## Quick Start Recommendations

### For Quick Demo (0 minutes):
- Use mock data (no API keys needed)
- Search: "Amazon Prime", "NordVPN", "Spotify"

### For Full Demo (8 minutes):
- Set up YouTube API (5 min) - Free!
- Set up OpenAI API (3 min) - $5-10 credit
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

