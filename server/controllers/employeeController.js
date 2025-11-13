const Employee = require('../models/employeeModel');

// @desc    Create a new employee
// @route   POST /api/admin/employee
// @access  Private (Admin)
const createEmployee = async (req, res) => {
    const { name, role, department, reportsTo, email } = req.body;
    let photoUrl = req.body.photoUrl; // Get photoUrl from body

    try {
        // If no photoUrl is provided in the body AND no file was uploaded, use default
        if (!photoUrl && !req.file) {
            photoUrl = '/uploads/default.png'; // Set default if neither is present
        } else if (req.file) {
            // If a file was uploaded, use its path (Cloudinary would set this)
            // Assuming req.file.path or req.file.filename would be used for Cloudinary/local storage
            // If using Cloudinary, it would look like: req.file.path
            // If using local multer, it would look like: `/uploads/${req.file.filename}`
            photoUrl = req.file.path; // Or `/uploads/${req.file.filename}` depending on your multer config
        }
        // If photoUrl was provided in the body, it remains as is.

        const employee = new Employee({
            name,
            role,
            department,
            email,
            reportsTo: reportsTo || null,
            photoUrl: photoUrl // Use the determined photoUrl
        });

        const createdEmployee = await employee.save();
        res.status(201).json(createdEmployee);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Error: Email already exists.' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
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
const updateEmployee = async (req, res) => {
    const { name, role, department, reportsTo, email } = req.body;
    let photoUrl = req.body.photoUrl; // Get photoUrl from body

    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // --- Logic for photoUrl during update ---
        if (req.file) {
            // If a new file was uploaded, use its path (Cloudinary/local)
            photoUrl = req.file.path; // Or `/uploads/${req.file.filename}`
        } else if (photoUrl === '') {
            // If photoUrl was explicitly set to an empty string in the body,
            // it means the user wants to remove the existing one and use the default.
            photoUrl = '/uploads/default.png';
        } else if (photoUrl === undefined && !employee.photoUrl) {
            // If photoUrl was not provided in the body AND the employee currently has no photo,
            // then set the default. This ensures existing photos aren't overwritten by default.
            photoUrl = '/uploads/default.png';
        }
        // If photoUrl was provided in the body (and not empty), or employee already has one,
        // it remains as is.
        // --- End photoUrl logic ---

        // Update fields (use `name ?? employee.name` for more robust handling of empty strings if needed)
        employee.name = name ?? employee.name;
        employee.role = role ?? employee.role;
        employee.department = department ?? employee.department;
        employee.email = email ?? employee.email;
        // Important: if reportsTo is explicitly sent as null, set it to null.
        // Otherwise, keep existing or update if provided.
        employee.reportsTo = reportsTo === undefined ? employee.reportsTo : (reportsTo || null);
        employee.photoUrl = photoUrl ?? employee.photoUrl; // Apply the determined photoUrl

        const updatedEmployee = await employee.save();
        res.status(200).json(updatedEmployee);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Error: Email already exists.' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
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

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
    try {
        const total_employees = await Employee.countDocuments();
        const departments = await Employee.distinct('department');
        const total_departments = departments.length;

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
    getStats,
};