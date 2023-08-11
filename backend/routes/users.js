import express from 'express';
import User from '../models/User.js';
import Truck from '../models/Truck.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, password, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // No need to hash the password here, as it will be hashed in the pre-save hook in the User model
        const newUser = new User({
            firstName,
            password, // Plain password
            email
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Compare provided password with stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

        res.status(200).json({ message: "Logged in successfully!", token });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Temporary route to reset the password
router.get('/reset-password', async (req, res) => {
    try {
        const email = 'hsgrewal16@gmail.com';
        const newPassword = '123';
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;
