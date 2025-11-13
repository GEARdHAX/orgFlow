const { body, validationResult } = require('express-validator');

// Middleware to handle the result of validation
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// ... (keep handleValidationErrors the same)

const validateEmployee = [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('role', 'Role is required').not().isEmpty().trim().escape(),

    // --- ADD THESE LINES ---
    body('email', 'Please include a valid email')
        .isEmail()
        .normalizeEmail(),
    // ---------------------

    body('department').trim().escape(),
    handleValidationErrors
];

// ... (keep validateUser the same)
// ... (keep module.exports the same)
const validateUser = [
    body('username', 'Username is required').not().isEmpty().trim().escape(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    handleValidationErrors
];

module.exports = {
    validateEmployee,
    validateUser
};