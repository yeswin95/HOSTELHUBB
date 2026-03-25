# 🚀 Hostel Management System Deployment Guide

Follow these steps to take your application from localhost to the cloud.

---

## 1. Database: MongoDB Atlas (Cloud)
Since your local MongoDB won't be accessible online, you must use a cloud database.
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/).
2. Create a **Shared Cluster** (Free).
3. Under **Network Access**, allow access from **0.0.0.0/0** (anywhere).
4. Under **Database Access**, create a user and password.
5. Click **Connect** > **Drivers** to get your Connection String. It looks like:
   `mongodb+srv://<user>:<password>@cluster.mongodb.net/hostel_db`

---

## 2. Backend: Render.com
1. **Prepare Code**:
   - Ensure `backend/server.js` uses `process.env.PORT`.
   - Ensure `CORS` is enabled (already in your code).
2. **Push to GitHub**:
   - Initialize a git repo: `git init`
   - Add files: `git add .`
   - Commit: `git commit -m "ready for deployment"`
   - Push to a new GitHub repository.
3. **Deploy on Render**:
   - Create a new **Web Service**.
   - Connect your GitHub repo.
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**: Add `MONGO_URI`, `JWT_SECRET`, and `NODE_ENV=production`.

---

## 3. Frontend: Netlify / Vercel
1. **Update API URL**:
   - In your frontend JS files, replace `http://localhost:5000` with your Render URL (e.g., `https://hostel-api.onrender.com`).
2. **Deploy**:
   - Go to [Netlify](https://www.netlify.com/).
   - Select **Add new site** > **Deploy manually**.
   - Drag and drop the **entire root folder** (containing your HTML files).

---

## 🛠 Maintenance
- **Seeding**: To seed your cloud database, you can run `npm run seed` locally once you've updated the `.env` with your Atlas URI.
- **Logs**: Check Render dashboard logs if the API isn't responding.
