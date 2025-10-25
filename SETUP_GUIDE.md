# 🚀 Quick Setup Guide

This guide will get you up and running with VoucherFinder in under 10 minutes.

## Prerequisites

Make sure you have installed:
- Python 3.8 or higher
- Node.js 18 or higher
- pip (Python package manager)
- npm (Node package manager)

Check your versions:
```bash
python --version
node --version
npm --version
```

## Step-by-Step Setup

### 1. Clone/Navigate to Project

```bash
cd "/Users/mahmoudkassem/Academics/Cursor Hackathon"
```

### 2. Backend Setup (5 minutes)

#### Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Configure Environment Variables

The `.env` file has been created for you. Open it and add your API keys:

```bash
# Edit backend/.env with your favorite editor
nano .env
# or
code .env
# or
vim .env
```

Add your keys:
```env
YOUTUBE_API_KEY=your_youtube_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Getting API Keys:**

**YouTube API Key** (Free - 10k queries/day):
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Go to Credentials → Create Credentials → API Key
5. Copy the API key

**OpenAI API Key** ($5-20 credit for testing):
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Create new secret key
5. Copy the API key

**Note**: The app will work with **mock data** if you don't add API keys! Perfect for quick demos.

#### Start Backend Server
```bash
python app.py
```

You should see:
```
🚀 Voucher Scraper API starting on http://localhost:5000
📝 API documentation available at http://localhost:5000/
💡 Frontend should run on http://localhost:3000
```

**Keep this terminal open!**

### 3. Frontend Setup (3 minutes)

Open a **new terminal window** and:

```bash
cd frontend
npm install
```

This will install all dependencies (may take 2-3 minutes).

#### Start Frontend Server
```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### 4. Open in Browser

Navigate to: **http://localhost:3000**

You should see the VoucherFinder homepage! 🎉

## Quick Test

1. Try searching for "Amazon Prime"
2. You should see AI suggestions and discount codes
3. Click "Copy Code" on any code
4. Click "This Worked!" on an AI suggestion

## Troubleshooting

### Backend won't start

**Error: "No module named flask"**
```bash
pip install flask flask-cors flask-sqlalchemy
```

**Error: "Database locked"**
```bash
cd backend
rm codes.db
python app.py  # Will recreate database
```

**Port 5000 already in use**

Edit `backend/.env`:
```env
FLASK_PORT=5001
```

And update `frontend/vite.config.ts`:
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // Change to 5001
    changeOrigin: true,
  }
}
```

### Frontend won't start

**Error: "Cannot find module"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 already in use**

The Vite dev server will automatically try port 3001, 3002, etc.

**Error: "Failed to fetch" when searching**

Make sure backend is running on port 5000. Check backend terminal for errors.

### API Keys not working

**YouTube API:**
- Make sure you enabled "YouTube Data API v3" in Google Cloud Console
- Check for API key restrictions (should allow all APIs for testing)

**OpenAI API:**
- Verify you have credits available in your OpenAI account
- Check API key is active (not revoked)

**Fallback**: The app includes mock data and will work without API keys for demo purposes!

## Development Tips

### Watch Logs

Backend logs (Flask terminal):
- All API requests
- Scraping status
- Errors

Frontend logs (Browser DevTools):
- Console for errors
- Network tab for API calls

### Make Changes

**Backend**: 
- Flask auto-reloads on file changes (in debug mode)
- No need to restart

**Frontend**:
- Vite hot-reloads instantly
- See changes immediately in browser

### Add More Brands

Search for any brand! The scrapers will find codes automatically.

Popular test brands:
- Amazon Prime
- NordVPN
- Spotify
- Skillshare
- HelloFresh
- Adobe Creative Cloud
- Netflix (shows AI suggestions even without codes)

## Production Deployment

### Option 1: Local Demo with ngrok

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from ngrok.com

# Share your frontend
ngrok http 3000
```

Get a public URL like: `https://abc123.ngrok.io`

### Option 2: Cloud Deployment

**Frontend → Vercel** (Free):
```bash
cd frontend
npm run build
npx vercel --prod
```

**Backend → Railway** (Free tier):
1. Push code to GitHub
2. Connect Railway to your repo
3. Deploy with one click

See `README.md` for detailed deployment instructions.

## Next Steps

1. ✅ Backend running on http://localhost:5000
2. ✅ Frontend running on http://localhost:3000
3. ✅ Try searching for brands
4. ✅ Test copying codes
5. ✅ Verify AI suggestions work

**You're ready to demo!** 🎊

Check `DEMO_GUIDE.md` for presentation tips.

## Need Help?

- Check `README.md` for full documentation
- Review `DEMO_GUIDE.md` for demo tips
- Check backend logs for errors
- Check browser console for frontend errors

---

Happy coding! 🚀

