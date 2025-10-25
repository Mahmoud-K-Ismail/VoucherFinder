# 🔧 Fix Render Deployment Error

## ❌ The Error You're Seeing

```
error: invalid local: stat /opt/render/project/src/backend/Dockerfile: not a directory
```

This happens because Render is trying to use Docker, but we want to deploy using native Python runtime instead.

## ✅ **SIMPLE FIX: Deploy Through Dashboard (Not YAML)**

### **Step 1: Delete Current Service**
1. In Render dashboard, click your `voucherfinder` service
2. Go to **Settings** (bottom of left sidebar)
3. Scroll down and click **"Delete Web Service"**
4. Confirm deletion

### **Step 2: Create New Web Service (Correct Way)**

1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"**
3. Select your **VoucherFinder** repository
4. Click **"Connect"**

### **Step 3: Configure Settings (IMPORTANT!)**

Fill in exactly as shown:

```
Name:                   voucherfinder-backend
Region:                 Oregon (US West)
Branch:                 main
Root Directory:         backend          ⚠️ CRITICAL!
Runtime:                Python 3
Build Command:          pip install -r requirements.txt
Start Command:          python app.py
Instance Type:          Free
```

### **Step 4: Add Environment Variables**

Click **"Advanced"** button, then add these one by one:

| Key | Value |
|-----|-------|
| `FLASK_ENV` | `production` |
| `FLASK_PORT` | `5001` |
| `FRONTEND_URL` | `https://voucherfinder.vercel.app` |

*(Optional: Add YOUTUBE_API_KEY and GEMINI_API_KEY if you have them)*

### **Step 5: Deploy!**

1. Click **"Create Web Service"**
2. Wait 3-5 minutes
3. Watch the logs - should see: `✅ Build successful!`
4. **Copy your backend URL** (e.g., `https://voucherfinder-backend.onrender.com`)

---

## 🧪 **Test Your Backend**

Once deployed, visit:
```
https://your-backend.onrender.com/api/health
```

Should see:
```json
{
  "status": "healthy",
  "message": "Voucher Scraper API is running"
}
```

✅ **Backend is working!**

---

## 📍 **Next: Deploy Frontend to Vercel**

Now that backend is working, follow these steps:

### **1. Update Frontend Environment**

On your computer, edit `frontend/.env.production`:

```
VITE_API_URL=https://your-backend.onrender.com
```
(Replace with the URL you copied from Step 5)

### **2. Commit and Push**

```bash
cd /Users/omarshehab/Desktop/VoucherFinder
git add frontend/.env.production
git commit -m "Update production API URL"
git push origin main
```

### **3. Configure Vercel**

Go to Vercel → Your project → **Settings** → **General**

Update these:
- **Root Directory**: `frontend` ⚠️ IMPORTANT!
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### **4. Add Environment Variable**

Go to **Settings** → **Environment Variables**

Add:
- **Name**: `VITE_API_URL`
- **Value**: `https://your-backend.onrender.com`
- **Environment**: Production

### **5. Redeploy**

Go to **Deployments** → Click "..." on latest → **"Redeploy"**

---

## 🔄 **Update Backend CORS**

Once Vercel gives you a URL (e.g., `https://voucherfinder-xyz.vercel.app`):

1. Go back to **Render** → Your backend service
2. Go to **Environment** tab
3. Update `FRONTEND_URL` to: `https://voucherfinder-xyz.vercel.app`
4. Click **"Save Changes"**

---

## ✅ **Final Test**

Visit your Vercel URL and search for "Amazon Prime"

Should see:
- ✅ Search works
- ✅ Voucher codes appear
- ✅ Copy button works
- ✅ No errors in console

---

## ⚠️ **Important Notes**

1. **Free Tier Spin Down**: Render free tier spins down after 15 minutes of inactivity. First request may take 50 seconds.

2. **Root Directory is Critical**: Make sure it's set to `backend` in Render and `frontend` in Vercel.

3. **Environment Variables**: Must be set BEFORE deploying. Redeploy after adding them.

4. **CORS**: The `FRONTEND_URL` environment variable allows your frontend to communicate with backend.

---

## 🎉 **You're Done!**

Your app should now be fully deployed and working!

Frontend: `https://your-app.vercel.app`
Backend: `https://your-app.onrender.com`

---

## 💡 **Why This Works**

- **Render** hosts your Python/Flask backend (native Python, not Docker)
- **Vercel** hosts your React/Vite frontend (static build)
- They communicate via the API URL environment variable
- CORS allows cross-origin requests between them

---

**Still having issues? Share the new error message!** 🚀

