# ✅ VoucherFinder Setup & Demo Checklist

Use this checklist to ensure everything is ready for your demo or development.

## 📋 Pre-Demo Checklist

### Environment Setup
- [ ] Python 3.8+ installed (`python --version`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] pip installed (`pip --version`)
- [ ] npm installed (`npm --version`)

### Backend Setup
- [ ] Navigated to `backend/` directory
- [ ] Installed Python dependencies (`pip install -r requirements.txt`)
- [ ] Created `.env` file (exists in backend/)
- [ ] Added API keys to `.env` (optional - works with mock data)
  - [ ] YouTube API key (optional)
  - [ ] OpenAI API key (optional)
- [ ] Backend starts successfully (`python app.py`)
- [ ] Backend accessible at http://localhost:5000
- [ ] Database tables created (check terminal output)

### Frontend Setup
- [ ] Navigated to `frontend/` directory
- [ ] Installed npm dependencies (`npm install`)
- [ ] Frontend starts successfully (`npm run dev`)
- [ ] Frontend accessible at http://localhost:3000
- [ ] No TypeScript errors in terminal

### Browser Testing
- [ ] Can access http://localhost:3000
- [ ] Homepage loads correctly
- [ ] Search bar is visible
- [ ] Can type in search bar
- [ ] "Find Codes" button is clickable

## 🧪 Functionality Testing

### Basic Search
- [ ] Search for "Amazon Prime"
- [ ] AI suggestions appear at top
- [ ] Discount codes appear below
- [ ] Loading animations work
- [ ] No console errors in browser DevTools

### Code Interaction
- [ ] Can click "Copy Code" button
- [ ] Toast notification appears
- [ ] Code is copied to clipboard (can paste elsewhere)

### AI Suggestions
- [ ] AI suggestions display with proper formatting
- [ ] Can click "This Worked!" button
- [ ] Verification count updates
- [ ] Can expand "View More Suggestions" (if available)

### Different Brands
- [ ] Search for "NordVPN" - shows different suggestions
- [ ] Search for "Spotify" - shows different suggestions
- [ ] Search for "Skillshare" - shows different suggestions
- [ ] Search for random brand - shows empty state or finds new codes

### UI/UX
- [ ] Layout is responsive (try resizing browser)
- [ ] Dark mode works (if browser has dark mode)
- [ ] Animations are smooth
- [ ] No broken images
- [ ] All buttons have hover effects

## 🎬 Demo Preparation

### Pre-Demo
- [ ] Both backend and frontend running
- [ ] Tested at least 3 brand searches
- [ ] Browser window sized appropriately
- [ ] Browser console closed (or errors cleared)
- [ ] Closed unnecessary browser tabs
- [ ] Internet connection stable
- [ ] Have backup screenshots ready (just in case)

### Demo Script Ready
- [ ] Know which brands to search for
- [ ] Can explain AI suggestions feature
- [ ] Can demonstrate code copying
- [ ] Can explain verification system
- [ ] Prepared to discuss tech stack
- [ ] Ready to answer questions

### Backup Plan
- [ ] Screenshots of working app saved
- [ ] README.md can be shown if demo fails
- [ ] Can explain architecture from code
- [ ] Know how to restart servers quickly

## 🐛 Common Issues & Fixes

### Backend Issues

**Issue**: Port 5000 already in use
- [ ] Change `FLASK_PORT` in `backend/.env` to 5001
- [ ] Update frontend proxy in `frontend/vite.config.ts`

**Issue**: Database errors
- [ ] Delete `backend/codes.db` if exists
- [ ] Restart backend (will recreate database)

**Issue**: API key errors
- [ ] Verify keys in `.env` are correct
- [ ] Check for extra spaces in `.env` file
- [ ] App works without keys (uses mock data)

### Frontend Issues

**Issue**: npm install fails
- [ ] Delete `node_modules` and `package-lock.json`
- [ ] Run `npm install` again

**Issue**: TypeScript errors
- [ ] Check all files saved
- [ ] Restart frontend server
- [ ] Run `npm run build` to check for compile errors

**Issue**: "Failed to fetch" errors
- [ ] Ensure backend is running on port 5000
- [ ] Check browser console for CORS errors
- [ ] Verify API URLs in `frontend/src/services/api.ts`

### Browser Issues

**Issue**: Blank page
- [ ] Check browser console for JavaScript errors
- [ ] Clear browser cache
- [ ] Try incognito/private window
- [ ] Verify frontend is actually running

**Issue**: Styling looks broken
- [ ] Tailwind CSS may not be compiling
- [ ] Check for PostCSS errors in terminal
- [ ] Restart frontend server

## 📊 Performance Checks

- [ ] Search results appear in < 5 seconds
- [ ] Page loads in < 2 seconds
- [ ] No memory leaks (check browser Task Manager)
- [ ] Smooth animations (no lag)
- [ ] Responsive on mobile size (use DevTools device emulation)

## 🚀 Deployment Checklist (Optional)

### Docker Deployment
- [ ] Docker installed
- [ ] `docker-compose.yml` configured
- [ ] Can run `docker-compose up`
- [ ] Both services start successfully

### Cloud Deployment
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Backend deployed to Railway/Heroku
- [ ] Environment variables configured in cloud
- [ ] Public URLs work
- [ ] CORS configured for production domains

## 📝 Documentation Checklist

- [ ] README.md is up to date
- [ ] SETUP_GUIDE.md matches actual setup
- [ ] API_KEYS_GUIDE.md is helpful
- [ ] DEMO_GUIDE.md prepared
- [ ] PITCH.md ready for presentation
- [ ] All markdown files have no broken links

## 🎯 Final Pre-Demo Check (5 minutes before)

- [ ] ✅ Backend running and responsive
- [ ] ✅ Frontend running and responsive
- [ ] ✅ Tested one full search flow
- [ ] ✅ Browser ready (no distractions)
- [ ] ✅ Presentation materials ready
- [ ] ✅ Confident and excited!

## 🎊 Post-Demo

- [ ] Gather feedback
- [ ] Note any bugs encountered
- [ ] List feature requests
- [ ] Thank judges/audience
- [ ] Celebrate! 🎉

---

## Quick Reference Commands

### Start Everything
```bash
# Terminal 1 (Backend)
cd backend
python app.py

# Terminal 2 (Frontend)
cd frontend
npm run dev
```

### Stop Everything
```bash
# Press Ctrl+C in both terminals
```

### Quick Start Script
```bash
# From project root
./start.sh
```

### Check Logs
```bash
# Backend logs: Check Terminal 1
# Frontend logs: Check Terminal 2
# Browser logs: Open DevTools Console (F12)
```

### Emergency Restart
```bash
# Kill all processes
pkill -f "python app.py"
pkill -f "vite"

# Start again
cd backend && python app.py &
cd frontend && npm run dev &
```

---

## ✅ All Green? You're Ready!

If all checkboxes are checked, you're 100% ready to demo VoucherFinder!

**Good luck!** 🚀

---

**Pro Tips:**
- 💡 Test your demo path 2-3 times before presenting
- 💡 Have your pitch memorized but sound natural
- 💡 Smile and show enthusiasm - judges love passion!
- 💡 If something breaks, stay calm and explain what should happen
- 💡 End with your strongest point (AI suggestions + ethical positioning)

