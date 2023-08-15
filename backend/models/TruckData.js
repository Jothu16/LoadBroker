import mongoose from 'mongoose';

const TruckDataSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    averageTankData: {
        type: Number,  // This can be in gallons or liters, depending on your preference
        required: true
    }
});

export default mongoose.model('TruckData', TruckDataSchema);
