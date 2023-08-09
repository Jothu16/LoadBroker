import mongoose from 'mongoose';

const loadSchema = new mongoose.Schema({
    loadId: {
        type: String,
        required: true,
        unique: true  // Each loadId should be unique
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
        type: String,  // Consider changing this to Number if weight is numeric
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

const Load = mongoose.model('Load', loadSchema);

export default Load;
