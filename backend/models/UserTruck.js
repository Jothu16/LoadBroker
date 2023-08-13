// models/UserTruck.js

import mongoose from 'mongoose';

const UserTruckSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    truckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    }
}, {
    timestamps: true
});

const UserTruck = mongoose.model('UserTruck', UserTruckSchema);

export default UserTruck;
