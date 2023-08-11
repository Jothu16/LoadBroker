import mongoose from 'mongoose';

// Schema for a truck in the database
const TruckSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        unique: true, // Ensure each truck model is unique
        trim: true // Remove any whitespace
    },
    year: {
        type: Number,
        required: true,
        min: 1900, // Assuming trucks weren't manufactured before 1900
        max: new Date().getFullYear() // Current year
    },
    tankCapacity: {
        type: Number,
        required: true,
        min: 0, // Tank capacity should be positive
        max: 2000 // Just an example, set an appropriate max value based on real-world data
    },
    // Consider adding fields like 'averageMPG' or 'ownerId' if needed
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Truck = mongoose.model('Truck', TruckSchema);

export default Truck;
