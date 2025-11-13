const express = require('express');
const router = express.Router();

const {
    getOrganization,
    getHierarchy
} = require('../controllers/orgController');

// @route   GET /api/public/organization
// @desc    Get public organization details (name, logo)
router.get('/organization', getOrganization);

// @route   GET /api/public/hierarchy
// @desc    Get the full, nested organization chart
router.get('/hierarchy', getHierarchy);

module.exports = router;