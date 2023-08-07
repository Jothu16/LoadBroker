import express from 'express';
import Load from '../models/Load';  // Ensure this path correctly points to your Load.js model file

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

// You can add more routes here for CRUD operations on loads if needed

export default router;
