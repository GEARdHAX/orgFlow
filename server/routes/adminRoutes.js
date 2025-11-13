const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const { validateEmployee } = require('../middleware/validation');
const upload = require('../middleware/uploadMiddleware');

const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee, getStats
} = require('../controllers/employeeController');

const { updateOrganization } = require('../controllers/orgController');

// --- All admin routes are protected ---
router.use(isAuthenticated);

// --- Employee CRUD Routes ---

// @route   POST /api/admin/employee
// @desc    Create a new employee
router.post('/employee', validateEmployee, createEmployee);

// @route   GET /api/admin/stats
// @desc    Get dashboard stats
router.get('/stats', getStats);

// @route   GET /api/admin/employees
// @desc    Get all employees
router.get('/employees', getAllEmployees);

// @route   GET /api/admin/employee/:id
// @desc    Get a single employee
router.get('/employee/:id', getEmployeeById);

// @route   PUT /api/admin/employee/:id
// @desc    Update an employee (can include 'photo' file upload)
router.put('/employee/:id', upload.single('photo'), updateEmployee);

// @route   DELETE /api/admin/employee/:id
// @desc    Delete an employee
router.delete('/employee/:id', deleteEmployee);

// --- Organization Route ---

// @route   PUT /api/admin/organization
// @desc    Update organization details (can include 'logo' file upload)
router.put('/organization', upload.single('logo'), updateOrganization);

module.exports = router;