# ⚡ Quick Deploy Guide

## 🎯 Fix Your Current Vercel Error

The error you're seeing happens because Vercel is trying to deploy the full-stack app as a static site. Here's how to fix it:

### **Step 1: Choose Your Deployment Strategy**

You have 3 options:

---

## ✅ **Option 1: Vercel (Frontend) + Render (Backend)** - RECOMMENDED

### **Deploy Backend First**

1. **Go to [Render.com](https://render.com)** and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub and select `VoucherFinder` repo
4. Configure:
   - **Name**: `voucherfinder-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
5. Click **"Create Web Service"**
6. **Copy the URL** (e.g., `https://voucherfinder-backend.onrender.com`)

### **Deploy Frontend to Vercel**

1. In Vercel, **delete your current deployment**
2. Create new deployment:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Add Environment Variable**:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com` (from step 6 above)
4. **Deploy!**

---

## 🚀 **Option 2: Deploy Everything to Render**

### **Backend**
1. Deploy as Web Service (same as Option 1)

### **Frontend**
1. Click **"New +"** → **"Static Site"**
2. Select your repo
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL` = your backend URL
5. Deploy!

---

## 🐳 **Option 3: Deploy with Railway (Easiest)**

1. Go to [Railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select `VoucherFinder`
4. Railway will detect `docker-compose.yml` and deploy both services
5. Done! 🎉

---

## 🔧 **Important: Update CORS**

After deploying, update `backend/app.py`:

```python
from flask_cors import CORS

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://your-frontend.vercel.app",  # Add your domain
            "https://your-frontend.onrender.com"  # Or Render domain
        ]
    }
})
```

Commit and push to redeploy backend.

---

## ✅ **Quick Checklist**

- [ ] Backend deployed and running
- [ ] Backend URL copied
- [ ] Frontend `.env.production` updated with backend URL
- [ ] Frontend deployed
- [ ] CORS updated in backend
- [ ] Tested live site

---

## 🧪 **Test Your Deployment**

1. Visit your frontend URL
2. Search for "Amazon Prime"
3. Should see vouchers and AI suggestions
4. Click "Copy Code" - should work!

---

## ⚠️ **Still Having Issues?**

### **"CORS Error in Browser"**
→ Update backend CORS settings to include your frontend domain

### **"Cannot Connect to API"**
→ Check `VITE_API_URL` environment variable is set correctly

### **"404 Error"**
→ Make sure Root Directory is set to `frontend` in Vercel

---

## 📚 **Full Deployment Guide**

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

**Need help? Reply with your error message!** 🚀

