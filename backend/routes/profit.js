const express = require('express');
const router = express.Router();
const calculateProfit = require('../utils/profitCalculator');

router.post('/calculateProfit', (req, res) => {
    const { load, truck } = req.body;
    const profit = calculateProfit(load, truck);
    res.json({ profit });
});

module.exports = router;
