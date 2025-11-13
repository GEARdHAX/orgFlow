const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    role: {
        type: String,
        required: [true, 'Please add a role'],
        trim: true,
    },
    // --- ADD THIS FIELD ---
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true, // Make sure emails are unique
        trim: true,
        lowercase: true,
    },
    // --------------------
    department: {
        type: String,
        trim: true,
    },
    reportsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        default: null,
    },
    photoUrl: {
        type: String,
        default: '/uploads/default.png'
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);