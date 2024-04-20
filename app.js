const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); 
dotenv.config();
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Routes
app.use('/api/auth', authRoutes); 

// Error handling middleware (place as the last middleware)
app.use((err, req, res, next) => {
   console.error(err);
   res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});