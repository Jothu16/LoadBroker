import express from 'express';
import Load from '../models/Load';

const router = express.Router();

// GET all loads
router.get('/', async (req, res) => {
    try {
        const loads = await Load.find();
        console.log("Fetched loads:", loads);  // Log the fetched loads
        res.json(loads);
    } catch (error) {
        console.error("Error fetching loads:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// POST a new load
router.post('/', async (req, res) => {
    const { loadId, distributionCenter, port, weight, price } = req.body;  // Updated fields
    try {
        const newLoad = new Load({
            loadId,
            distributionCenter,  // Updated field
            port,  // Updated field
            weight,
            price
        });
        await newLoad.save();
        res.json(newLoad);
    } catch (error) {
        console.error("Error saving new load:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;


