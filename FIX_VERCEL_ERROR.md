# 🔧 Fix Your Vercel 404 Error

## ❌ The Problem

You're getting a **404_NOT_FOUND** error because Vercel is trying to deploy your **entire repository** as a static site, but:
- Your backend (Python/Flask) can't run on Vercel as a static site
- Your frontend needs to be in a specific directory
- The API URL isn't configured for production

## ✅ The Solution: 3 Easy Steps

---

## 📍 **STEP 1: Deploy Backend to Render (5 minutes)**

### 1.1 Create Render Account
- Go to **https://render.com**
- Click **"Get Started"** and sign up with GitHub

### 1.2 Create Web Service
- Click **"New +"** (top right)
- Select **"Web Service"**
- Click **"Connect GitHub"** and authorize Render
- Find and select your **VoucherFinder** repository

### 1.3 Configure Your Service
Fill in these settings:

```
Name:               voucherfinder-backend
Region:             Oregon (US West) or your closest
Branch:             main
Root Directory:     backend
Runtime:            Python 3
Build Command:      pip install -r requirements.txt
Start Command:      python app.py
Instance Type:      Free
```

### 1.4 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these (one by one):

```
Key: FLASK_ENV
Value: production

Key: FLASK_PORT  
Value: 5001

Key: FRONTEND_URL
Value: https://voucherfinder.vercel.app
(You'll update this with your real Vercel URL in Step 2)

Key: YOUTUBE_API_KEY (Optional)
Value: your_youtube_api_key

Key: GEMINI_API_KEY (Optional)
Value: your_gemini_api_key
```

### 1.5 Deploy!
- Click **"Create Web Service"**
- Wait 3-5 minutes for deployment
- **Copy your backend URL** (e.g., `https://voucherfinder-backend.onrender.com`)

✅ **Backend is live!**

---

## 📍 **STEP 2: Fix & Redeploy Frontend to Vercel**

### 2.1 Update Your Production Environment File

On your local computer, edit:
`frontend/.env.production`

Replace the content with:
```
VITE_API_URL=https://your-backend-url.onrender.com
```
(Use the URL you copied from Step 1.5)

### 2.2 Commit and Push

```bash
cd /Users/omarshehab/Desktop/VoucherFinder

git add .
git commit -m "Configure for production deployment"
git push origin main
```

### 2.3 Configure Vercel Correctly

Go back to **Vercel** → Your project → **Settings**

#### A. Update Build Settings:
- **Framework Preset**: Vite
- **Root Directory**: `frontend` ⚠️ IMPORTANT!
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### B. Add Environment Variable:
- Go to **Environment Variables** tab
- Click **"Add New"**
- **Name**: `VITE_API_URL`
- **Value**: `https://your-backend-url.onrender.com`
- **Environment**: Production
- Click **"Save"**

### 2.4 Redeploy
- Go to **Deployments** tab
- Click **"..."** on the latest deployment
- Click **"Redeploy"**

✅ **Frontend is live!**

---

## 📍 **STEP 3: Update Backend CORS**

### 3.1 Get Your Vercel Frontend URL
- In Vercel, copy your deployment URL (e.g., `https://voucherfinder-abc123.vercel.app`)

### 3.2 Update Render Environment Variable
- Go back to **Render** → Your backend service
- Go to **Environment** tab
- Find **FRONTEND_URL**
- Update value to your Vercel URL: `https://voucherfinder-abc123.vercel.app`
- Click **"Save Changes"**

Your backend will auto-redeploy with the new CORS settings!

✅ **All set!**

---

## 🧪 **Test Your Deployment**

1. **Visit your Vercel URL**
2. **Search for "Amazon Prime"**
3. **You should see:**
   - ✅ Search completes without errors
   - ✅ Voucher codes appear
   - ✅ AI suggestions show up
   - ✅ Copy button works

---

## ⚠️ **Troubleshooting**

### "CORS Error" in Browser Console
**Solution**: 
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Include `https://` but NO trailing slash
- Wait 2-3 minutes after updating for backend to redeploy

### "Network Error" or "Failed to Fetch"
**Solution**:
- Check your backend is running: Visit `https://your-backend.onrender.com`
- Should see: `{"name": "Voucher Scraper API", ...}`
- If you see "Service Unavailable", wait a few minutes (Render free tier spins down)

### "Environment Variable Not Working"
**Solution**:
- Make sure variable names start with `VITE_` in frontend
- Redeploy after adding environment variables
- Check they're set for "Production" environment in Vercel

### Still Getting 404?
**Solution**:
- Verify Root Directory is set to `frontend` in Vercel
- Make sure `vercel.json` is in your repo root
- Try deleting and recreating the Vercel project

---

## 📋 **Quick Checklist**

- [ ] Backend deployed to Render
- [ ] Backend URL copied
- [ ] `frontend/.env.production` updated with backend URL
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel Root Directory set to `frontend`
- [ ] Vercel environment variable `VITE_API_URL` added
- [ ] Frontend redeployed on Vercel
- [ ] Backend `FRONTEND_URL` updated with Vercel URL
- [ ] Tested live site - search works!

---

## 🎉 **Success!**

Your clean, modern VoucherFinder should now be live and working!

**Share your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.onrender.com`

---

## 💡 **Pro Tips**

1. **Custom Domain**: In Vercel settings, you can add a custom domain for free
2. **Monitoring**: Check Render logs if backend has issues
3. **Performance**: First request to Render may be slow (free tier spins down after inactivity)
4. **Upgrades**: Both platforms have paid plans for better performance

---

## 📚 **Need More Help?**

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed info
- Check [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for alternative methods
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs

---

**Still stuck? Share your error message!** 🚀

