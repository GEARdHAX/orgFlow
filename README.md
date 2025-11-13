# OrgFlow 🚀

A Modern Organization Management & Hierarchy Visualization System

**OrgFlow** is a full-stack web application designed to help organizations manage employees, maintain structure, and visualize hierarchical relationships in a clean and interactive interface.

---

## ⚠️ Authentication Issue Resolved — Why You Got 401 Errors (Important)

### **The Problem: Why 401 Unauthorized Happened**

Your browser was **not sending the session cookie** back to the server after login.

**What was happening step-by-step:**

* **Login:** The server created a session and sent a session cookie to the browser.
* **Cookie Rejected:** The cookie used `sameSite: 'none'`, but modern browsers require such cookies to also use `secure: true` (HTTPS only).
* **Conflict:** In development, you're using `http://localhost` (not HTTPS).
* **Browser Block:** The browser refused the cookie because it was considered insecure.
* **Result:** Future API calls had **no session cookie**, so the server returned **401 Unauthorized**.

---

### **The Solution: Environment-Based Cookie Settings**

Your `server.js` was updated to adjust cookie security depending on whether you're running locally (dev) or deployed (production).

```js
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));
```

### **How This Fix Works**

#### **In Development (localhost)**

* `secure: false`
* `sameSite: 'lax'`

Browsers accept the cookie on HTTP during development → login works normally.

#### **In Production**

* `secure: true`
* `sameSite: 'none'`

Correct, secure configuration for deployed HTTPS environments → supports cross-domain cookies.

This ensures compatibility with browser security rules in both environments and prevents the 401 Unauthorized errors you were facing.

---

# ✨ Features

### 🔐 Secure Authentication

* Admin login using **JWT + HTTP-only cookies**
* Protected admin routes
* Automatic redirect handling

### 👥 Employee Management

* Add employees
* Assign hierarchy
* Cloudinary image uploads
* Edit & delete
* View details via modal

### 🗂️ Dynamic Organization Chart

* Auto-generated tree
* Interactive org chart
* Pan & zoom
* Infinite canvas movement
* Click nodes for details

### 📊 Admin Dashboard

* Overview metrics
* Quick controls
* Clean responsive UI

### 🎨 Modern UI/UX

* React + Tailwind
* Glassmorphism theme
* Fully responsive
* Smooth interactions

### ⚙️ Robust Backend

* Express + MongoDB
* JWT auth
* Cloudinary uploads
* Multer handling
* Async error wrapper

---

## 🛠️ Technologies Used

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
* JWT + Bcrypt
* Cloudinary
* Multer
* CORS
* Cookie-parser

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18+
* MongoDB Atlas or local
* Cloudinary

---

## 📁 1. Clone the Repository

```bash
git clone <your-repo-url>
cd orgflow
```

---

## 🖥️ 2. Backend Setup (server)

```bash
cd server
npm install
```

### Add `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret
DATABASE_URL=your_mongo_url
CLIENT_URL=http://localhost:3000
```

### Start Backend

```bash
npm start
```

Backend → `http://localhost:5000`

---

## 🌐 3. Frontend Setup (client)

```bash
cd ../client
npm install
```

### Add `.env`

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Start Frontend

```bash
npm run dev
```

Frontend → `http://localhost:3000`

---

## 🌍 Deployment

### Backend → Render

* Root: `server`
* Build: `npm install`
* Start: `npm start`
* Add all env variables
* `CLIENT_URL` = your Vercel domain

### Frontend → Vercel

* Root: `client`
* Add env variable
  `VITE_BACKEND_URL = <render-url>`

---

## 🤝 Contributing

Issues and PRs are welcome.

---

## 📝 License

Unlicensed — free to use, modify, and distribute.

---

### 🎉 Thank you for using **OrgFlow**!