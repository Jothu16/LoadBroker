const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
    distributionCenter: {
        type: String,
        required: true,
        enum: ['DC1', 'DC2', 'DC3'], // Add more distribution centers as needed
    },
    port: {
        type: String,
        required: true,
        enum: ['Port1', 'Port2', 'Port3'], // Add more ports as needed
    },
    price: {
        type: Number,
        required: true,
    },
    // ... other fields
});

module.exports = mongoose.model('Load', loadSchema);
