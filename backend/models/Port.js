import mongoose from 'mongoose';

// Schema for a port in the database
const portSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true  // Ensure each port name is unique
    },
    location: {
        type: String,
        required: true
    }
});

const Port = mongoose.model('Port', portSchema);

export default Port;
