# OrgFlow 🚀

A Modern Organization Management & Hierarchy Visualization System

**OrgFlow** is a full-stack MERN application that helps organizations manage employees, maintain hierarchy, and visualize reporting structure in a beautiful, interactive interface.

---

# ⚠️ Authentication Issue Fixed — Why 401 Errors Happened

When deploying the app (Frontend → Vercel, Backend → Render), protected API routes were returning:

```
401 Unauthorized
```

This happened because the browser **was not receiving or storing the session cookie** (`connect.sid`) from the backend.

### **Root Causes**

* **Proxy Issue:** Render runs behind a reverse proxy → Express saw requests as HTTP → refused to send `secure` cookies.
* **Missing Session Creation:** Passport authenticated users but no session was created because `req.login()` was missing.
* **Helmet Blocking Cookies:** Default Helmet settings blocked cross-origin cookies.
* **Environment Mismatch:** Cookie settings must differ in dev (HTTP) vs production (HTTPS).

---

### **Final Fixes Implemented**

#### ✔ 1. Enable proxy trust (required on Render)

```js
app.set("trust proxy", 1);
```

#### ✔ 2. Correct environment-based session cookie settings

```js
secure: process.env.NODE_ENV === "production",
sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
```

* Localhost → HTTP friendly
* Production → Cross-site + HTTPS safe

#### ✔ 3. Added required Passport call for creating sessions

```js
req.login(user, () => { ... });
```

#### ✔ 4. Updated Helmet to allow cross-origin cookies

```js
crossOriginResourcePolicy: { policy: "cross-origin" }
```

**Result:**
Cookies are now sent, stored, and included in all authenticated requests.
Protected routes work correctly in production.

---

# ✨ Features

### 🔐 Secure Authentication

* Session-based admin login
* HTTP-only cookies
* Persistent authenticated sessions
* Protected admin routes

### 👥 Employee Management

* Add/edit/delete employees
* Assign reporting hierarchy
* Cloudinary image uploads
* Modal-based employee profiles

### 🗂️ Organization Chart

* Auto-generated hierarchical tree
* jQuery.orgchart integration
* Pan, zoom, drag, infinite canvas
* Click nodes for full details

### 📊 Admin Dashboard

* Metrics overview
* Quick actions
* Clean responsive UI

### 🎨 Modern UI/UX

* React + Tailwind CSS
* Glassmorphism theme
* Fully responsive and smooth

### ⚙️ Robust Backend

* Express + MongoDB
* Cloudinary uploads
* Multer handling
* Async error wrapper
* Passport (Local Strategy)
* Session-based auth

---

# 🛠️ Technologies Used

### Frontend

* React.js
* Zustand
* Axios
* Tailwind CSS
* Lucide Icons
* jQuery.orgchart

### Backend

* Node.js / Express
* MongoDB + Mongoose
* Passport + express-session
* Cloudinary
* Multer
* CORS
* Helmet

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd orgflow
```

---

# 🖥️ 2️⃣ Backend Setup (server)

```bash
cd server
npm install
```

### Create `.env` inside `/server`

```env
PORT=5000
DATABASE_URL=your_mongo_url
SESSION_SECRET=your_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Start Backend

```bash
npm start
```

Backend runs at:
`http://localhost:5000`

---

# 🌐 3️⃣ Frontend Setup (client)

```bash
cd ../client
npm install
```

### Create `.env` inside `/client`

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Start Frontend

```bash
npm run dev
```

Frontend runs at:
`http://localhost:5173`

---

# 🌍 Deployment

## Backend → Render

* Root: `server`
* Build: `npm install`
* Start: `npm start`
* Required ENV:

  * `DATABASE_URL`
  * `SESSION_SECRET`
  * `CLIENT_URL=https://your-vercel-app.vercel.app`
  * `NODE_ENV=production`

## Frontend → Vercel

* Root: `client`
* ENV:

  ```env
  VITE_BACKEND_URL=https://your-render-api-url.onrender.com
  ```

---

# 🤝 Contributing

Open an issue or submit a PR — contributions are welcome!

---

# 📝 License

This project is **Unlicensed** — free to use, modify, and distribute.

---

### 🎉 Thank you for using **OrgFlow**!
