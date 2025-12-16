const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Custom
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');

// Load ENV
dotenv.config();

// Validate production env
if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL || !process.env.SESSION_SECRET) {
        console.error('❌ Missing critical environment variables.');
        process.exit(1);
    }
}

// Connect DB
connectDB();

// Init passport strategies
require('./config/passport')(passport);

const app = express(); // <--- app is defined here!

// --- CRITICAL FIX FOR RENDER/VERCEL ---
// Tell Express to trust the proxy (Render's load balancer).
// Required for 'secure: true' cookies to work behind a proxy.
// MUST be AFTER 'const app = express();'
app.set('trust proxy', 1);
// --------------------------------------

// ---------------------
// CORS CONFIG
// ---------------------
const clientUrl = process.env.CLIENT_URL?.replace(/\/+$/, '') || '';
console.log('CORS CLIENT_URL (trimmed):', clientUrl);

app.use(cors({
    origin: clientUrl,
    credentials: true,
}));

// ---------------------
// HELMET CONFIG (REQUIRED for cross-site cookies)
// ---------------------
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginOpenerPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }, // MUST HAVE
    })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------
// SESSION MUST COME BEFORE PASSPORT
// ---------------------
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",   // True on Render
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
}));

// ---------------------
// PASSPORT MUST COME AFTER SESSION
// ---------------------
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.get("/health", (req, res) => {
    res.status(200).send("OK");
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// ---------------------
// START SERVER
// ---------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});