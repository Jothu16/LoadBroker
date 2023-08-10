import express from 'express';
import Load from '../models/Load.js';
import { calculateProfit } from '../utils/utils.js';  // Import the calculateProfit function

const router = express.Router();

// GET all loads
router.get('/', async (req, res) => {
    try {
        const loads = await Load.find();
        const updatedLoads = loads.map(load => {
            const profit = calculateProfit(load, { model: "Volvo FH16" }); // Replace with the actual truck info of the user
            return { ...load._doc, profit };
        });
        console.log("Sending loads:", updatedLoads);
        res.json(updatedLoads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
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
        
        // Optionally, calculate profit when creating a new load
        const profit = calculateProfit(newLoad, { model: "Volvo FH16" }); // Replace with the actual truck info of the user
        newLoad.profit = profit; // Store the profit with the load
        
        await newLoad.save();
        res.json(newLoad);
    } catch (error) {
        console.error("Error saving new load:", error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

export default router;

