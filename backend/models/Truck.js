import mongoose from 'mongoose';

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
        max: 2000 // Just an example, set an appropriate max value
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Truck = mongoose.model('Truck', TruckSchema);

export default Truck;
