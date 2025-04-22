const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db'); // Import the MongoDB connection function

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToMongo().then((db) => {
  // API route to get all products
  app.get('/api/products', async (req, res) => {
    try {
      const products = await db.collection('Products').find().toArray();
      res.json(products);  // Send the products as a response
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(err => {
  console.log('Failed to connect to MongoDB:', err);
});
