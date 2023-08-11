import express from 'express';
import estimateTripDuration from '../utils/tripDurationEstimator.js';

const router = express.Router();

router.post('/estimateTripDuration', (req, res) => {
    const { distance } = req.body;
    const duration = estimateTripDuration(distance);
    res.json({ duration });
});

export default router;
