const Employee = require('../models/employeeModel');

// @desc    Create a new employee
// @route   POST /api/admin/employee
// @access  Private (Admin)
// @desc    Create a new employee
// @route   POST /api/admin/employee
// @access  Private (Admin)
const createEmployee = async (req, res) => {
    // Add 'email' to this line
    const { name, role, department, reportsTo, photoUrl, email } = req.body;

    try {
        const employee = new Employee({
            name,
            role,
            department,
            email, // <-- Now 'email' is defined
            reportsTo: reportsTo || null,
            photoUrl: photoUrl || undefined
        });

        const createdEmployee = await employee.save();
        res.status(201).json(createdEmployee);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Error: Email already exists.' });
        }
        // This will catch validation errors (like a missing 'name')
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(400).json({ message: 'Error creating employee', error: error.message });
    }
};

// @desc    Get all employees
// @route   GET /api/admin/employees
// @access  Private (Admin)
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

// @desc    Get a single employee by ID
// @route   GET /api/admin/employee/:id
// @access  Private (Admin)
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update an employee
// @route   PUT /api/admin/employee/:id
// @access  Private (Admin)
// @desc    Update an employee
// @route   PUT /api/admin/employee/:id
// @access  Private (Admin)
const updateEmployee = async (req, res) => {
    // Add 'email' to this line
    const { name, role, department, reportsTo, photoUrl, email } = req.body;

    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update fields
        employee.name = name || employee.name;
        employee.role = role || employee.role;
        employee.department = department || employee.department;
        employee.email = email || employee.email; // <-- Now 'email' is defined
        employee.reportsTo = reportsTo === undefined ? employee.reportsTo : (reportsTo || null);
        employee.photoUrl = photoUrl || employee.photoUrl;

        if (req.file) {
            employee.photoUrl = `/uploads/${req.file.filename}`;
        }

        const updatedEmployee = await employee.save();
        res.status(200).json(updatedEmployee);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Error: Email already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(400).json({ message: 'Error updating employee', error: error.message });
    }
};

// @desc    Delete an employee
// @route   DELETE /api/admin/employee/:id
// @access  Private (Admin)
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // TODO: Add logic to re-assign employees who report to this person
        // For now, we'll just delete.
        // Example: await Employee.updateMany({ reportsTo: req.params.id }, { $set: { reportsTo: null } });

        await Employee.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ... (keep all your other functions: createEmployee, getAllEmployees, etc.)

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
    try {
        // 1. Get total employee count
        const total_employees = await Employee.countDocuments();

        // 2. Get unique department count
        const departments = await Employee.distinct('department');
        const total_departments = departments.length;

        // 3. Get updates in the last 24 hours
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recent_updates = await Employee.countDocuments({
            updatedAt: { $gte: oneDayAgo },
        });

        res.status(200).json({
            total_employees,
            total_departments,
            recent_updates,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching stats', error: error.message });
    }
};


// Now, update your module.exports at the bottom of the file
module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getStats, // <-- Add getStats here
};