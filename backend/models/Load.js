import mongoose from 'mongoose';

const LoadSchema = new mongoose.Schema({
    loadId: {
        type: String,
        required: true,
        unique: true  // Ensuring each loadId is unique
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Load = mongoose.model('Load', LoadSchema);

export default Load;
