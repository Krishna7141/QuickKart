const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');  // Added cart route
const path = require('path');
const fs = require('fs');

// Log current directory for debugging
console.log('Current Directory:', __dirname);

// Verify if User.js exists in the expected path
const userModelPath = path.join(__dirname, 'models', 'User.js');
console.log('Checking if User.js exists:', userModelPath);

if (!fs.existsSync(userModelPath)) {
    console.error('Error: User.js not found at the expected path.');
    process.exit(1);
}

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.MONGO_URI) {
    console.error('ERROR: MONGO_URI is not defined. Please check your .env file.');
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET is not defined. Please check your .env file.');
    process.exit(1);
}

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);  // Registered the cart route here

// Catch-all route for invalid URLs
app.use('*', (req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
