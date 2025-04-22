const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server Error. Unable to retrieve products.' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  let { name, description, price } = req.body;
  const image = req.file ? req.file.path : null;  // Store the image path if an image is uploaded

  // Convert price to a number if it's a string
  price = parseFloat(price);

  // Validate required fields
  if (!name || isNaN(price)) {
    return res.status(400).json({ message: 'Name and a valid price are required fields.' });
  }

  try {
    const newProduct = new Product({ name, description, price, image });  // Include image path
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Server Error. Unable to create product.' });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
};
