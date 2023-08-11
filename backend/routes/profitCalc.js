import express from 'express';
import profitCalculator from '../utils/profitCalculator.js';

const router = express.Router();

router.post('/calculate-profit', (req, res) => {
    const { load, truck } = req.body;
    try {
        const profit = profitCalculator(load, truck);
        res.json({ profit });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate profit.' });
    }
});

export default router;
