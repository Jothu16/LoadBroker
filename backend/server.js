import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import users from './routes/users.js';
import loads from './routes/loads.js';
import trucks from './routes/trucks.js';


const app = express();

// Mock data for trucks
const truckData = {
    "Volvo FH16": {
        year: 2020,
        tankCapacity: 600 // in liters
    },
    "Freightliner Cascadia": {
        year: 2019,
        tankCapacity: 550 // in liters
    }
    // ... add more truck models and years as needed
};

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/LoadBroker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

// Use the loads route
app.use('/api/loads', loads);

// Routes
app.use('/api/users', users);

// New route to get truck data
app.use('/api/trucks', trucks);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// Mock data for average fuel price (per gallon)
const averageFuelPrice = 3.5; // in dollars

function calculateProfit(load, truckInfo) {
    const distance = getDistance(load.origin, load.destination); // You'll need a function to get distance based on origin and destination
    const fuelRequired = distance / truckMPG[truckInfo.model];
    const fuelCost = fuelRequired * averageFuelPrice;

    const profit = load.price - fuelCost;

    return profit;
}

// You might also need a function to calculate distance based on origin and destination.
// This can be a placeholder until you integrate a real distance calculation API.
function getDistance(origin, destination) {
    // Placeholder: return a mock distance for now
    return 1000; // in miles
}

