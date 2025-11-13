// Checks if user is authenticated (logged in)
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized: You must be logged in.' });
};

// Optional: Checks if user is an admin
// In your case, all users are admins, but this is good practice
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Forbidden: You are not an admin.' });
};

module.exports = { isAuthenticated, isAdmin };