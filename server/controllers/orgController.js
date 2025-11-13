const Organization = require('../models/organizationModel');
const Employee = require('../models/employeeModel');

// @desc    Get organization details
// @route   GET /api/public/organization
// @access  Public
const getOrganization = async (req, res) => {
    try {
        // Find or create the organization document. 'upsert' ensures it's created if it doesn't exist.
        const organization = await Organization.findOneAndUpdate(
            {}, // Find any document (since there's only one)
            { $setOnInsert: { orgName: 'My Organization' } }, // Set defaults on insert
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(organization);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update organization details
// @route   PUT /api/admin/organization
// @access  Private (Admin)
const updateOrganization = async (req, res) => {
    const { orgName, description } = req.body;

    try {
        const updateData = {
            orgName,
            description
        };

        // Check if a new logo file was uploaded
        if (req.file) {
            updateData.logoUrl = `/uploads/${req.file.filename}`;
        }

        // Find the single org document and update it.
        // 'upsert: true' creates it if it doesn't exist.
        const updatedOrganization = await Organization.findOneAndUpdate(
            {}, // Empty filter matches the single document
            { $set: updateData },
            { new: true, upsert: true }
        );

        res.status(200).json(updatedOrganization);
    } catch (error) {
        res.status(400).json({ message: 'Error updating organization', error: error.message });
    }
};

// @desc    Get the full employee hierarchy
// @route   GET /api/public/hierarchy
// @access  Public
const getHierarchy = async (req, res) => {
    try {
        // 1. Fetch all employees from the database
        const allEmployees = await Employee.find().lean(); // .lean() gives plain JS objects

        if (!allEmployees || allEmployees.length === 0) {
            return res.status(200).json([]); // Return empty array if no employees
        }

        // 2. Create a map (hash table) for efficient lookup by ID
        const employeeMap = {};
        allEmployees.forEach(employee => {
            // Add a 'children' array for the tree structure
            employeeMap[employee._id.toString()] = { ...employee, children: [] };
        });

        // 3. Build the tree structure
        const hierarchy = [];
        allEmployees.forEach(employee => {
            const employeeNode = employeeMap[employee._id.toString()];

            if (employee.reportsTo) {
                const parentId = employee.reportsTo.toString();
                const parentNode = employeeMap[parentId];

                if (parentNode) {
                    // Add this employee as a child of their manager
                    parentNode.children.push(employeeNode);
                } else {
                    // This employee reports to someone who doesn't exist? (Orphan)
                    // Add them to the root for now.
                    hierarchy.push(employeeNode);
                }
            } else {
                // No 'reportsTo' means this is a root-level employee (e.g., CEO)
                hierarchy.push(employeeNode);
            }
        });

        // 4. Send the final, nested array of root nodes
        res.status(200).json(hierarchy);
    } catch (error) {
        res.status(500).json({ message: 'Error building hierarchy', error: error.message });
    }
};

module.exports = {
    getOrganization,
    updateOrganization,
    getHierarchy
};