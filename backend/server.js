import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import users from './routes/users.js';  // Corrected this line
import passportConfig from './config/passport';

const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Passport config
passportConfig(passport);

// Routes
app.use('/api/users', users);

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/LoadBroker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));






