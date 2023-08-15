const express = require('express');
const router = express.Router();
const Port = require('../models/Port');

// Create a new port
router.post('/', async (req, res) => {
    try {
        const newPort = new Port(req.body);
        const savedPort = await newPort.save();
        res.json(savedPort);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all ports
router.get('/', async (req, res) => {
    try {
        const ports = await Port.find();
        res.json(ports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a port by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPort = await Port.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPort);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a port by ID
router.delete('/:id', async (req, res) => {
    try {
        await Port.findByIdAndDelete(req.params.id);
        res.json({ message: 'Port deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
