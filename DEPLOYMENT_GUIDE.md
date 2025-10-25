# 🚀 Deployment Guide

This guide will help you deploy VoucherFinder to production with your newly refactored frontend!

## 📋 Overview

VoucherFinder is a full-stack application that requires:
- **Backend** (Python/Flask) - API server
- **Frontend** (React/Vite) - User interface

We'll deploy them separately for best performance.

---

## ✅ **Recommended: Vercel (Frontend) + Render (Backend)**

### **Part 1: Deploy Backend to Render**

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `VoucherFinder`

3. **Configure Service**
   ```
   Name: voucherfinder-api
   Region: Oregon (US West) or closest to you
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python app.py
   ```

4. **Add Environment Variables**
   ```
   FLASK_ENV=production
   FLASK_PORT=5001
   YOUTUBE_API_KEY=your_youtube_api_key (optional)
   OPENAI_API_KEY=your_openai_api_key (optional)
   ```

5. **Deploy!**
   - Click "Create Web Service"
   - Wait 3-5 minutes
   - Copy your backend URL (e.g., `https://voucherfinder-api.onrender.com`)

✅ **Backend deployed!**

---

### **Part 2: Deploy Frontend to Vercel**

1. **Update API URL**
   - Create `frontend/.env.production`:
   ```bash
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your `VoucherFinder` repo
   - Configure:
     ```
     Framework Preset: Vite
     Root Directory: frontend
     Build Command: npm run build
     Output Directory: dist
     ```

4. **Add Environment Variable**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes

✅ **Frontend deployed!**

---

## 🎯 **Alternative: Deploy Both to Render**

If you prefer one platform for everything:

### **Backend on Render** (same as above)

### **Frontend on Render**

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect GitHub repo

2. **Configure**
   ```
   Name: voucherfinder-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: frontend/dist
   ```

3. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy!**

---

## 🐳 **Alternative: Deploy with Docker to Railway**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)

2. **Deploy from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `VoucherFinder`

3. **Railway will auto-detect docker-compose.yml**

4. **Add Environment Variables**
   ```
   YOUTUBE_API_KEY=your_key
   OPENAI_API_KEY=your_key
   ```

5. **Deploy!**

---

## 🔧 **Update Backend CORS for Production**

After deploying, update your backend to allow your frontend domain:

**Edit `backend/app.py`:**

```python
from flask_cors import CORS

# Update CORS to include your production frontend URL
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",  # Local development
            "https://your-frontend.vercel.app",  # Your Vercel domain
            "https://voucherfinder.vercel.app"  # Or custom domain
        ]
    }
})
```

Then redeploy the backend.

---

## ✅ **Deployment Checklist**

- [ ] Backend deployed to Render/Railway
- [ ] Backend URL copied
- [ ] Frontend environment variable set with backend URL
- [ ] Frontend deployed to Vercel
- [ ] CORS updated in backend to allow frontend domain
- [ ] Test the live site
- [ ] Search works for at least one brand
- [ ] Copy code functionality works
- [ ] AI suggestions appear

---

## 🧪 **Test Your Deployment**

1. Visit your frontend URL
2. Search for "Amazon Prime"
3. Verify:
   - ✅ Search works
   - ✅ Voucher codes appear
   - ✅ Copy button works
   - ✅ AI suggestions show
   - ✅ No console errors

---

## ⚠️ **Common Issues**

### "CORS Error"
- Add your frontend domain to backend CORS settings
- Redeploy backend

### "API Request Failed"
- Check backend is running (visit backend URL directly)
- Verify VITE_API_URL is set correctly in frontend
- Check browser console for exact error

### "Build Failed"
- Check build logs
- Ensure all dependencies in package.json
- Verify build command is correct

### "Environment Variables Not Working"
- In Vercel: must start with `VITE_`
- Redeploy after adding environment variables
- Check they're set in the correct environment (Production)

---

## 🎨 **Custom Domain (Optional)**

### **Vercel Custom Domain**
1. Go to Project Settings → Domains
2. Add your domain (e.g., `voucherfinder.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### **Render Custom Domain**
1. Go to Settings → Custom Domain
2. Add domain
3. Update DNS CNAME record
4. Wait for SSL

---

## 📊 **Monitoring**

### **Render**
- View logs in real-time
- Monitor CPU/Memory usage
- Set up alerts

### **Vercel**
- Analytics dashboard
- Function logs
- Performance metrics

---

## 💰 **Cost Estimate**

### **Free Tier Limits:**
- **Vercel**: 100GB bandwidth/month, unlimited projects
- **Render**: 750 hours/month (free tier)
- **Railway**: $5 free credit/month

**Total Cost: $0-5/month** for hobby projects

---

## 🚀 **Quick Deploy Commands**

```bash
# 1. Add deployment files
git add vercel.json backend/render.yaml frontend/.env.production

# 2. Commit
git commit -m "Add deployment configuration"

# 3. Push to GitHub
git push origin main

# 4. Deploy frontend (automatic via Vercel GitHub integration)
# 5. Deploy backend (automatic via Render GitHub integration)
```

---

## 📚 **Resources**

- [Vercel Vite Deployment](https://vercel.com/docs/frameworks/vite)
- [Render Python Deployment](https://render.com/docs/deploy-flask)
- [Railway Documentation](https://docs.railway.app/)

---

## 🎉 **You're Done!**

Your clean, modern VoucherFinder is now live and accessible worldwide! Share the URL and start saving money! 💰

**Example URLs:**
- Frontend: `https://voucherfinder.vercel.app`
- Backend: `https://voucherfinder-api.onrender.com`

