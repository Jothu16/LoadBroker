import express from 'express';
import Truck from '../models/Truck.js';

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

// Additional routes for updating and deleting trucks can be added here...

export default router;
