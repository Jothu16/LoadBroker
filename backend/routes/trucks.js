import express from 'express';
import Truck from '../models/Truck.js';
import User from '../models/User.js';  // Import the User model

const router = express.Router();

// @route   GET api/trucks
// @desc    Get all trucks
// @access  Public
router.get('/', async (req, res) => {
    try {
        const trucks = await Truck.find();
        res.json(trucks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// @route   POST api/trucks
// @desc    Add new truck
// @access  Public
router.post('/', async (req, res) => {
    const { model, year, tankCapacity } = req.body;

    // Validation
    if (!model || !year || !tankCapacity) {
        return res.status(400).json({ msg: 'Please provide all required fields.' });
    }

    try {
        let truck = new Truck({
            model,
            year,
            tankCapacity
        });

        truck = await truck.save();
        res.json(truck);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// @route   PUT api/trucks/select/:truckId
// @desc    Select a truck for the user's profile
// @access  Public (should be Private in a real-world scenario)
router.put('/select/:truckId', async (req, res) => {
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

// Additional routes for updating and deleting trucks can be added here...

export default router;
