# 🎉 Switched to Google Gemini API (FREE!)

VoucherFinder now uses **Google Gemini** instead of OpenAI for AI-powered discount suggestions!

## Why Gemini?

### ✅ Benefits
- **100% FREE** (vs ~$0.03/request with OpenAI)
- **No credit card required**
- **1,500 requests/day** free tier
- **60 requests/minute** rate limit
- Same quality AI suggestions
- Perfect for demos and development

### 💰 Cost Comparison

| API | Free Tier | Cost per Request | Credit Card Required |
|-----|-----------|------------------|----------------------|
| **Google Gemini** | ✅ 1,500/day | FREE | ❌ No |
| OpenAI GPT-4 | ❌ Pay only | ~$0.03 | ✅ Yes |

**Savings:** $45/month for 1,500 requests! 🎊

---

## 🔑 How to Get Gemini API Key (3 minutes)

### Step 1: Go to Google AI Studio
Visit: https://makersuite.google.com/app/apikey

### Step 2: Sign In
Use your Google account (Gmail)

### Step 3: Create API Key
1. Click **"Create API Key"**
2. Select or create a Google Cloud project
3. Copy the API key (starts with `AIzaSy...`)

### Step 4: Add to Your `.env` File
```bash
cd backend
nano .env  # or use your favorite editor
```

Add this line:
```bash
GEMINI_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Save and close!

### Step 5: Restart Backend
```bash
# Kill the old process
lsof -ti:5001 | xargs kill -9

# Start with new API key
FLASK_PORT=5001 python3 app.py
```

---

## 📊 Rate Limits

### Free Tier (No Payment Required)
- **60 requests per minute (RPM)**
- **1,500 requests per day (RPD)**
- Perfect for:
  - Demos
  - Development
  - Small-scale production
  - Hackathons

### If You Need More
Gemini has paid tiers with higher limits, but free tier is generous enough for most use cases!

---

## 🧪 Testing

1. **Start the app** (if not running):
   ```bash
   cd backend
   FLASK_PORT=5001 python3 app.py
   ```

2. **Search any brand** in the frontend
3. **Look for AI suggestions** with 💡 icon
4. **Should see**: "AI Suggestion: Smart Ways to Save"

If you see suggestions, **Gemini is working!** ✅

---

## 🔍 What Changed?

### Updated Files
1. ✅ `backend/requirements.txt` - Added `google-generativeai`
2. ✅ `backend/config.py` - Changed to `GEMINI_API_KEY`
3. ✅ `backend/ai/suggester.py` - Gemini API implementation
4. ✅ `backend/.env.example` - Updated template
5. ✅ `API_KEYS_GUIDE.md` - Updated documentation

### Breaking Changes
- ❌ `OPENAI_API_KEY` no longer used
- ✅ Use `GEMINI_API_KEY` instead

### Migration Guide
If you had OpenAI configured:
```bash
# Old (remove this)
OPENAI_API_KEY=sk-...

# New (add this)
GEMINI_API_KEY=AIzaSy...
```

---

## 🆘 Troubleshooting

### "Invalid API key" Error
- ✅ Check key starts with `AIzaSy`
- ✅ No extra spaces in `.env` file
- ✅ Restart backend after adding key

### "Quota exceeded" Error
You've hit the free tier limits:
- **Per minute**: 60 requests
- **Per day**: 1,500 requests

**Solution**: Wait a minute or upgrade to paid tier

### No AI Suggestions Showing
- ✅ Check backend logs for errors
- ✅ Verify API key is in `backend/.env`
- ✅ Try restarting the backend
- ✅ App will use mock data if no API key

### Backend Won't Start
```bash
# Install the new dependency
pip install google-generativeai

# Restart backend
cd backend
FLASK_PORT=5001 python3 app.py
```

---

## 💡 Still Works Without API Key!

The app includes **mock data** for these brands:
- Amazon Prime
- NordVPN
- Spotify
- Skillshare

**Perfect for demos without any API setup!**

---

## 📚 More Information

- **Gemini API Docs**: https://ai.google.dev/docs
- **Get API Key**: https://makersuite.google.com/app/apikey
- **Pricing**: https://ai.google.dev/pricing
- **Rate Limits**: https://ai.google.dev/gemini-api/docs/quota

---

## 🎯 Quick Reference

```bash
# Environment Variable
GEMINI_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Get API Key
https://makersuite.google.com/app/apikey

# Free Limits
- 60 requests/minute
- 1,500 requests/day
- No credit card required

# Model Used
gemini-pro (latest)
```

---

**Enjoy free AI suggestions!** 🚀

