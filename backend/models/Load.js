import mongoose from 'mongoose';

// Schema for a load in the database
const loadSchema = new mongoose.Schema({
    loadId: {
        type: String,
        required: true,
        unique: true  // Ensure each loadId is unique
    },
    distributionCenter: {  // The starting point of the load
        type: String,
        required: true
    },
    port: {  // The destination point of the load
        type: String,
        required: true
    },
    weight: {  // Weight of the load
        type: Number,  // Using Number type for weight
        required: true
    },
    price: {  // Price of the load
        type: Number,
        required: true
    },
    date: {  // Date when the load was added
        type: Date,
        default: Date.now
    }
    // Consider adding other fields like 'status' or 'truckId' if needed
});

const Load = mongoose.model('Load', loadSchema);

export default Load;

