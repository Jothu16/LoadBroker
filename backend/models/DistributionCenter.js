import mongoose from 'mongoose';

// Schema for a distribution center in the database
const distributionCenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true  // Ensure each distribution center name is unique
    },
    location: {
        type: String,
        required: true
    }
});

const DistributionCenter = mongoose.model('DistributionCenter', distributionCenterSchema);

export default DistributionCenter;
