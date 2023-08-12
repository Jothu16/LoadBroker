import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { firstName, password, email } = req.body;

        console.log(`Registering user with email: ${email}`);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User with email ${email} already exists.`);
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const newUser = new User({
            firstName,
            password,
            email
        });

        await newUser.save();

        console.log(`User with email ${email} registered successfully.`);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(`Attempting to log in user with email: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User with email ${email} not found.`);
            return res.status(400).json({ message: "User not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            console.log(`Invalid credentials for user with email: ${email}`);
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

        console.log(`User with email ${email} logged in successfully.`);
        res.status(200).json({ message: "Logged in successfully!", token });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

router.get('/reset-password', async (req, res) => {
    try {
        const email = 'hsgrewal16@gmail.com';
        const newPassword = '123';
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        console.log(`Password reset successfully for user with email: ${email}`);
        res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;
