const express = require('express');
const router = express.Router();
const DistributionCenter = require('../models/DistributionCenter.js');

// Create a new distribution center
router.post('/', async (req, res) => {
    try {
        const newCenter = new DistributionCenter(req.body);
        const savedCenter = await newCenter.save();
        res.json(savedCenter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all distribution centers
router.get('/', async (req, res) => {
    try {
        const centers = await DistributionCenter.find();
        res.json(centers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a distribution center by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCenter = await DistributionCenter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCenter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a distribution center by ID
router.delete('/:id', async (req, res) => {
    try {
        await DistributionCenter.findByIdAndDelete(req.params.id);
        res.json({ message: 'Distribution center deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
