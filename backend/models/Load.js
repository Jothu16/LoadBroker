import mongoose from 'mongoose';

const LoadSchema = new mongoose.Schema({
    loadId: {
        type: String,
        required: true,
        unique: true  // Assuming each loadId should be unique
    },
    distributionCenter: {  // Replacing 'origin'
        type: String,
        required: true
    },
    port: {  // Replacing 'destination'
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
    // ... any other fields you want to include
});

const Load = mongoose.model('Load', LoadSchema);

export default Load;
