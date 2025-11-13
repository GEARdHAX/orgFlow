const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true,
        default: 'My Organization',
    },
    logoUrl: {
        type: String,
        default: '/uploads/default-logo.png',
    },
    description: {
        type: String,
        default: 'Welcome to our organization.',
    }
});

// This ensures there is only ever ONE organization document in the collection.
// You can find it simply by Organization.findOne()
organizationSchema.index({ orgName: 1 }, { unique: true });

module.exports = mongoose.model('Organization', organizationSchema);