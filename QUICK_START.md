# ⚡ Quick Start (5 Minutes)

Get VoucherFinder running in 5 minutes or less!

## Step 1: Start Backend (2 minutes)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Expected output:**
```
🚀 Voucher Scraper API starting on http://localhost:5000
Database tables created successfully!
```

✅ Backend is now running! **Keep this terminal open.**

## Step 2: Start Frontend (2 minutes)

**Open a NEW terminal window**, then:

```bash
cd frontend
npm install
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 1234 ms
  ➜  Local:   http://localhost:3000/
```

✅ Frontend is now running! **Keep this terminal open too.**

## Step 3: Test It! (1 minute)

1. **Open browser:** http://localhost:3000
2. **Type:** "Amazon Prime"
3. **Click:** "Find Codes"
4. **See:** AI suggestions + discount codes appear!

🎉 **It works!** You're ready to demo.

---

## What If It Doesn't Work?

### "Port 5000 already in use"
```bash
# Kill whatever's using port 5000
lsof -ti:5000 | xargs kill -9

# Or change the port in backend/.env:
FLASK_PORT=5001
```

### "Module not found"
```bash
# Backend
cd backend
pip install flask flask-cors flask-sqlalchemy

# Frontend
cd frontend
rm -rf node_modules
npm install
```

### Still stuck?
Check the full **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for detailed troubleshooting.

---

## 🎯 Test These Brands

- **Amazon Prime** - Best AI suggestions
- **NordVPN** - Great YouTube codes
- **Spotify** - Family plan suggestions
- **Skillshare** - Multiple strategies

---

## 📚 Next Steps

- Add API keys (optional): See [API_KEYS_GUIDE.md](API_KEYS_GUIDE.md)
- Prepare demo: See [DEMO_GUIDE.md](DEMO_GUIDE.md)
- Read pitch: See [PITCH.md](PITCH.md)

---

**That's it! Happy coding!** 🚀

