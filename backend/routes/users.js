import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import Truck from '../models/Truck.js';  // Import the Truck model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

router.post('/register', async (req, res) => {
    try {
        const { firstName, password, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const newUser = new User({
            firstName,
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

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

    res.json({ token, userId: user._id });
});

// @route   PUT api/users/select-truck/:truckId
// @desc    Select a truck for the user's profile
// @access  Private (should be authenticated)
router.put('/select-truck/:truckId', async (req, res) => {
    const userId = req.body.userId;  // Assuming the userId is sent in the request body

    try {
        const truck = await Truck.findById(req.params.truckId);
        if (!truck) {
            return res.status(404).json({ message: 'Truck not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.selectedTruck = truck._id;
        await user.save();

        res.json({ message: 'Truck selected successfully', selectedTruck: truck });
    } catch (error) {
        console.error("Error selecting truck:", error.message, error.stack);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;