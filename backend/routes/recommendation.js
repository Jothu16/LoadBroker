import express from 'express';
import recommendLoads from '../utils/recommendationSystem.js';

const router = express.Router();

router.post('/recommend', (req, res) => {
    const { user, loads } = req.body;
    const recommendations = recommendLoads(user, loads);
    res.json({ recommendations });
});

export default router;
