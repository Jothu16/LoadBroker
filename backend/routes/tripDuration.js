const express = require('express');
const router = express.Router();
const estimateTripDuration = require('../utils/tripDurationEstimator');

router.post('/estimateTripDuration', (req, res) => {
    const { distance } = req.body;
    const duration = estimateTripDuration(distance);
    res.json({ duration });
});

module.exports = router;
