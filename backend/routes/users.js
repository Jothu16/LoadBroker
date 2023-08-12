import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Truck from '../models/Truck.js';


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

// @route   GET api/users/:userId/truck
// @desc    Get selected truck for a user
// @access  Public (should be Private in a real-world scenario)
router.get('/:userId/truck', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('selectedTruck');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.selectedTruck);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// @route   PUT api/users/select-truck/:truckId
// @desc    Select a truck for the user's profile
// @access  Public (should be Private in a real-world scenario)
router.put('/select-truck/:truckId', async (req, res) => {
    const userId = req.body.userId;  // Assuming the userId is sent in the request body

    try {
        const truck = await Truck.findById(req.params.truckId);
        if (!truck) {
            return res.status(404).json({ msg: 'Truck not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.selectedTruck = truck._id;
        await user.save();

        res.json({ msg: 'Truck selected successfully', selectedTruck: truck });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

export default router;
