const passport = require('passport');
const User = require('../models/userModel');

// @desc    Register a new admin user
// @route   POST /api/auth/register
// @access  Public (or protected, you decide)
// NOTE: You only need to run this once or twice to create your admin accounts.
// You might want to remove this endpoint in production.
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({
            username,
            password, // Password will be hashed by the 'pre-save' hook in the model
            role: role || 'admin'
        });

        const savedUser = await user.save();

        // Log the user in immediately after registration
        req.login(savedUser, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({
                message: 'User registered and logged in successfully',
                user: {
                    id: savedUser._id,
                    username: savedUser.username,
                    role: savedUser.role
                }
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate user (login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: info.message || 'Login failed' });
        }

        // req.login is added by Passport. It establishes a session.
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({
                message: 'Logged in successfully',
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        });
    })(req, res, next);
};

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private (requires login)
const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        req.session.destroy();
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

// @desc    Get current user session
// @route   GET /api/auth/session
// @access  Private
const getSession = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            user: {
                id: req.user._id,
                username: req.user.username,
                role: req.user.role
            }
        });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getSession
};