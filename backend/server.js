import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import users from './routes/users.js';
import loads from './routes/loads.js';

const app = express();

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
