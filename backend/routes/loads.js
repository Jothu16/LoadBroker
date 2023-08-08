import express from 'express';
import Load from '../models/Load.js';

const router = express.Router();

// GET all loads
router.get('/', async (req, res) => {
    try {
        const loads = await Load.find();
        res.json(loads);
    } catch (error) {
        console.error("Error fetching loads:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// POST a new load
router.post('/', async (req, res) => {
    const { loadId, origin, destination, weight, price } = req.body;

    // Check if load with the same loadId already exists
    const existingLoad = await Load.findOne({ loadId });
    if (existingLoad) {
        return res.status(400).json({ message: "Load with this ID already exists." });
    }

    try {
        const newLoad = new Load({
            loadId,
            origin,
            destination,
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

// PUT - Update a load by its ID
router.put('/:id', async (req, res) => {
    const { loadId, origin, destination, weight, price } = req.body;
    try {
        const load = await Load.findById(req.params.id);
        if (!load) {
            return res.status(404).json({ message: "Load not found." });
        }
        load.loadId = loadId;
        load.origin = origin;
        load.destination = destination;
        load.weight = weight;
        load.price = price;
        await load.save();
        res.json(load);
    } catch (error) {
        console.error("Error updating load:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// DELETE - Remove a load by its ID
router.delete('/:id', async (req, res) => {
    try {
        const load = await Load.findById(req.params.id);
        if (!load) {
            return res.status(404).json({ message: "Load not found." });
        }
        await load.remove();
        res.json({ message: "Load deleted successfully." });
    } catch (error) {
        console.error("Error deleting load:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;


