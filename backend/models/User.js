import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Schema for a user in the database
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true // Remove any whitespace
    },
    // Consider adding a 'lastName' field if needed
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // Ensure each email is unique
    },
    password: {
        type: String,
        required: true
    },
    selectedTruck: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Truck model
        ref: 'Truck'
    }
    // Consider adding fields like 'phoneNumber' or 'address' if needed
});

// Pre-save hook to hash the password before saving if it's modified
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare provided password with stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
