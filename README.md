# OrgFlow 🚀  
A Modern Organization Management & Hierarchy Visualization System

**OrgFlow** is a full-stack web application designed to help organizations manage employees, maintain structure, and visualize hierarchical relationships in a clean and interactive interface.

---

## ✨ Features

### 🔐 Secure Authentication
- Admin login using **JWT + HTTP-only cookies**
- Protected admin routes
- Automatic redirect handling

### 👥 Employee Management
- Add employees (name, email, role, department)
- Assign reporting hierarchy (`reportsTo`)
- Upload profile pictures (Cloudinary)
- Edit and delete employees
- Modal-based employee details view

### 🗂️ Dynamic Organization Chart
- Auto-generated hierarchical tree from DB
- Interactive org chart using **jQuery.orgchart**
- Smooth **pan & zoom**
- Click nodes to view full employee profile
- Infinite canvas movement (Figma-like UX)

### 📊 Admin Dashboard
- Overview metrics
- Quick management actions
- Clean and responsive layout

### 🎨 Modern UI/UX
- **React + Tailwind CSS**
- Premium **glassmorphism** theme
- Works on all devices
- Minimal, beautiful, and intuitive

### ⚙️ Robust Backend
- **Node.js + Express**
- MongoDB with Mongoose
- JWT authentication flow
- Cloudinary file uploads
- Multer for form-data handling

---

## 🛠️ Technologies Used

### Frontend
- React.js  
- React Router DOM  
- Zustand (state management)  
- Axios  
- Tailwind CSS  
- Lucide Icons  
- jQuery.orgchart  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JSON Web Tokens  
- Bcrypt  
- Cloudinary  
- Multer + Multer-Cloudinary  
- Express-async-handler  
- Cookie-parser  
- CORS  
- Dotenv  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)  
- MongoDB Atlas or local MongoDB  
- Cloudinary account  

---

## 📁 1. Clone the Repository

```bash
git clone <your-repo-url>
cd orgflow
````

---

## 🖥️ 2. Backend Setup (server)

```bash
cd server
npm install
```

### Create `.env` in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

### Run the Backend

```bash
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

## 🌐 3. Frontend Setup (client)

```bash
cd ../client
npm install
```

### Create `.env` in `/client`:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Run the Frontend

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🌍 Deployment

### Backend → Render

* Root Directory: **server**
* Build: `npm install`
* Start: `npm start`
* Add all environment variables
* Set `CLIENT_URL` to your Vercel frontend URL

### Frontend → Vercel

* Root Directory: **client**
* Add environment variable:

  * `REACT_APP_BACKEND_URL = <render-backend-url>`

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Open an issue or submit a pull request.

---

## 📝 License

This project is **Unlicensed**.
You are free to use, modify, distribute without restrictions.

---

### 🎉 Thank you for using **OrgFlow**!
