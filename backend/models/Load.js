import mongoose from 'mongoose';

const LoadSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
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

// The model name is 'Load' and Mongoose will look for the 'Loads' collection in the database
const Load = mongoose.model('Load', LoadSchema);

export default Load;
