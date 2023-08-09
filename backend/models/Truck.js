// models/Truck.js

import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    tankCapacity: {
        type: Number,
        required: true
    }
});

const Truck = mongoose.model('Truck', TruckSchema);

export default Truck;
