import express from 'express';
const router = express.Router();
import User from '../models/User.js';

router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Create a new user
        const newUser = new User({
            username,
            password, // Note: In a real-world scenario, you'd want to hash the password before saving.
            email
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;
