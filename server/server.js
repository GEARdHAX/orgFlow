const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Import custom middleware and config
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');

// Load .env variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize Passport config
require('./config/passport')(passport);

const app = express();

// --- Core Middleware ---

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow your React app
    credentials: true // Allow cookies
}));

// Set security HTTP headers
app.use(helmet());

// Body parsers for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Session and Authentication Middleware ---
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true, // Prevent client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === 'production' // Use secure cookies in production
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// --- Static Asset Serving ---
// Serve uploaded files (e.g., logos, profile pictures)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// --- Error Handling Middleware ---
// (Must be after all routes)
app.use(notFound);
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});