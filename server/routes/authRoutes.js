const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getSession } = require('../controllers/authController');
const { validateUser } = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
router.post('/register', validateUser, registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   GET /api/auth/logout
router.get('/logout', isAuthenticated, logoutUser);

// @route   GET /api/auth/session
router.get('/session', getSession); // No auth needed, controller handles it

module.exports = router;