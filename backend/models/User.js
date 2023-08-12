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
        console.log(`Hashing password for user with email: ${this.email}`);
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log(`Hashed password: ${this.password}`);
    }
    next();
});

// Method to compare provided password with stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    console.log(`Checking password for user with email: ${this.email}`);
    console.log(`Provided password: ${password}`);
    console.log(`Stored hashed password: ${this.password}`);
    const isCorrect = await bcrypt.compare(password, this.password);
    console.log(`Password match result: ${isCorrect}`);
    return isCorrect;
};

const User = mongoose.model('User', userSchema);

export default User;
