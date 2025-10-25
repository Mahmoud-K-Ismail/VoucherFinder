# ⚠️ Port Change Notice

## Issue
Port 5000 is used by macOS AirPlay Receiver by default.

## Solution
Backend is now running on **port 5001** instead of 5000.

## What Was Updated
- ✅ `frontend/vite.config.ts` - proxy target changed to 5001
- ✅ `frontend/src/services/api.ts` - API_BASE_URL changed to 5001

## How to Start

### Backend
```bash
cd backend
FLASK_PORT=5001 python3 app.py
```
Or use the system Python:
```bash
cd backend
FLASK_PORT=5001 /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 app.py
```

### Frontend
```bash
cd frontend
npm install  # if not done yet
npm run dev
```

## Access URLs
- **Backend API**: http://localhost:5001
- **Frontend**: http://localhost:3000
- **Health Check**: http://localhost:5001/api/health

## Alternative: Disable AirPlay Receiver
If you want to use port 5000:
1. System Preferences → General → AirDrop & Handoff
2. Disable "AirPlay Receiver"
3. Restart backend with port 5000

