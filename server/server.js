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

// --- CHANGE 1: Add Production Check ---
// Crash the server if critical secrets are missing in production
if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) {
        console.error('FATAL ERROR: DATABASE_URL is not set.');
        process.exit(1);
    }
    if (!process.env.SESSION_SECRET) {
        console.error('FATAL ERROR: SESSION_SECRET is not set.');
        process.exit(1);
    }
}
// ------------------------------------

// Connect to Database
connectDB();

// Initialize Passport config
require('./config/passport')(passport);

const app = express();

// --- Core Middleware ---

// Enable CORS
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/+$/, '') : ''; // Trim any trailing slashes
console.log('CORS CLIENT_URL (trimmed):', clientUrl);

app.use(cors({
    origin: clientUrl, // Use the trimmed URL
    credentials: true // Allow cookies
}));

// --- CHANGE 2: Configure Helmet ---
// Set security HTTP headers.
// Relax default policies that can block cross-origin (Vercel/Render) communication.
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
}));
// ----------------------------------

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
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        // SameSite: 'none' // Add this if you still have cookie issues in prod
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// --- Static Asset Serving ---
// __dirname is fine in CommonJS (require syntax)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// --- Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});