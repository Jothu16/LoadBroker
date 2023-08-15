import express from 'express';
import TruckData from '../models/TruckData.js';

const router = express.Router();

// Add new truck data
router.post('/add', async (req, res) => {
    try {
        const newTruckData = new TruckData(req.body);
        const savedTruckData = await newTruckData.save();
        res.json(savedTruckData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Retrieve truck data based on model and year
router.get('/:model/:year', async (req, res) => {
    try {
        const truckData = await TruckData.findOne({ model: req.params.model, year: req.params.year });
        if (!truckData) return res.status(404).json({ error: "Data not found" });
        res.json(truckData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update existing truck data
router.put('/update/:id', async (req, res) => {
    try {
        const updatedTruckData = await TruckData.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTruckData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete truck data
router.delete('/delete/:id', async (req, res) => {
    try {
        await TruckData.findByIdAndDelete(req.params.id);
        res.json({ message: "Data deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
