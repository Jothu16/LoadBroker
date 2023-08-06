const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const usersRoute = require('./routes/users');


// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS
app.use('/api/users', usersRoute);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/LoadBroker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
