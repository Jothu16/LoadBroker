import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

router.post('/register', async (req, res) => {
    try {
        const { firstName, password, email } = req.body; // Changed 'username' to 'firstName'

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const newUser = new User({
            firstName, // Changed 'username' to 'firstName'
            password,
            email
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error.message, error.stack);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists using email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    // Create JWT (assuming you have JWT logic in place)
    const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

    res.json({ token, userId: user._id });
});


export default router;
