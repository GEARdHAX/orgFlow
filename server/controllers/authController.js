// controllers/authController.js

const passport = require('passport');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/**
 * Register a new user
 * POST /api/auth/register
 */
exports.registerUser = asyncHandler(async (req, res) => {
    const { username, password, ...rest } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const existing = await User.findOne({ username });
    if (existing) {
        return res.status(409).json({ message: 'Username already taken' });
    }

    // Create user (assumes User model handles password hashing in pre-save)
    const user = new User({ username, password, ...rest });
    await user.save();

    // Return user without password
    const safeUser = {
        _id: user._id,
        username: user.username,
        role: user.role,
        ...rest
    };

    res.status(201).json({ message: 'Registration successful', user: safeUser });
});

/**
 * Login user using passport-local and create a session
 * POST /api/auth/login
 *
 * Important: must call req.login(user, ...) so express-session writes the cookie.
 */
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ message: info?.message || 'Invalid credentials' });
        }

        // Create session and send Set-Cookie header
        req.login(user, (err) => {
            if (err) return next(err);

            // Optionally, you can reload user from DB or strip sensitive fields
            const safeUser = {
                _id: user._id,
                username: user.username,
                role: user.role
            };

            return res.json({ message: 'Login successful', user: safeUser });
        });
    })(req, res, next);
};

/**
 * Logout user and destroy session
 * GET /api/auth/logout
 */
exports.logoutUser = (req, res, next) => {
    // passport >=0.6 supports callback for logout
    req.logout(function (err) {
        if (err) return next(err);

        // Destroy server session and clear cookie
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    // Log but still attempt to clear cookie and respond
                    console.error('Session destroy error:', err);
                }
                // Clear the cookie set by express-session
                res.clearCookie('connect.sid', { path: '/' });
                return res.json({ message: 'Logged out' });
            });
        } else {
            // No session present
            res.clearCookie('connect.sid', { path: '/' });
            return res.json({ message: 'Logged out' });
        }
    });
};

/**
 * Get current session user
 * GET /api/auth/session
 */
exports.getSession = asyncHandler(async (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        // req.user is set by passport.deserializeUser
        const user = req.user;
        const safeUser = {
            _id: user._id,
            username: user.username,
            role: user.role
        };
        return res.json({ user: safeUser });
    }

    return res.status(401).json({ message: 'Not authenticated' });
});
