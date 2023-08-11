import express from 'express';
import Load from '../models/Load.js';

const router = express.Router();

// Get all loads
router.get('/', async (req, res) => {
    try {
        const loads = await Load.find();
        res.json(loads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one load
router.get('/:id', getLoad, (req, res) => {
    res.json(res.load);
});

// Create one load
router.post('/', async (req, res) => {
    const load = new Load({
        distributionCenter: req.body.distributionCenter,
        port: req.body.port,
        price: req.body.price,
        // ... other fields
    });

    try {
        const newLoad = await load.save();
        res.status(201).json(newLoad);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function to get a load by ID
async function getLoad(req, res, next) {
    let load;
    try {
        load = await Load.findById(req.params.id);
        if (!load) {
            return res.status(404).json({ message: 'Cannot find load' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.load = load;
    next();
}

export default router;
