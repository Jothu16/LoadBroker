import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import users from './routes/users.js';
import loads from './routes/loads.js';
import trucks from './routes/trucks.js';

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for handling CORS issues
app.use(cors());

// MongoDB connection string
const dbURI = 'mongodb://127.0.0.1:27017/LoadBroker';

// Connect to MongoDB with error handling
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true  // This is to ensure that indexing is used, which can help in performance
    })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);  // Exit the process with an error code
    });

// API routes
app.use('/api/users', users);  // User-related routes (registration, login, profile, etc.)
app.use('/api/loads', loads);  // Load-related routes (add, retrieve, update, delete loads)
app.use('/api/trucks', trucks);  // Truck-related routes (add, retrieve, update, delete trucks)

// Middleware for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Define the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
