import express from 'express';
import UserTruck from '../models/UserTruck.js';
import Truck from '../models/Truck.js';
import jwt from 'jsonwebtoken'; // Assuming you're using JWT for tokens

const router = express.Router();

// @route   PUT api/userTrucks/:truckId
// @desc    Select or update a truck for the user's profile
// @access  Public (should be Private in a real-world scenario)
router.put('/:truckId', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: 'Authorization header missing' });
    }
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"

    // Decode the JWT token to inspect its contents
    const decodedPayload = jwt.decode(token);
    console.log("Decoded JWT Payload:", decodedPayload);

    let userId;
    try {
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret key
        userId = decodedToken.id;  // <-- This line has been changed
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
    }

    // Log the User ID after token verification
    console.log("User ID after token verification:", userId);

    // Check if userId is missing or invalid
    if (!userId) {
        return res.status(400).json({ msg: 'User ID is missing or invalid' });
    }

    try {
        const truck = await Truck.findById(req.params.truckId);
        if (!truck) {
            return res.status(404).json({ msg: 'Truck not found' });
        }

        let userTruck = await UserTruck.findOne({ userId });
        if (userTruck) {
            userTruck.truckId = truck._id;
        } else {
            userTruck = new UserTruck({
                userId,
                truckId: truck._id
            });
        }

        await userTruck.save();

        res.json({ msg: 'Truck selected/updated successfully', selectedTruck: truck });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

export default router;
