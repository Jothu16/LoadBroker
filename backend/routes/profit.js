import express from 'express';
import calculateProfit from '../utils/profitCalculator.js';

const router = express.Router();

router.post('/calculateProfit', (req, res) => {
    const { load, truck } = req.body;
    const profit = calculateProfit(load, truck);
    res.json({ profit });
});

export default router;
