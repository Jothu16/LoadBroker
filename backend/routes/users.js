const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    truckModel: {
        type: String,
        required: true,
    },
    truckYear: {
        type: Number,
        required: true,
    },
    // ... other fields
});

module.exports = mongoose.model('User', userSchema);