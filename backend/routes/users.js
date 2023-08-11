import express from 'express';
import User from '../models/User.js';
import Truck from '../models/Truck.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, password, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            password: hashedPassword,
            email
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// ... [rest of the code remains unchanged]

export default router;
