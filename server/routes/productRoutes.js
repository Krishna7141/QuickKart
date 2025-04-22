const express = require('express');
const { getProducts, createProduct, getProductById } = require('../controllers/productController');
const multer = require('multer');
const router = express.Router();

// Set up multer storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  // Path where the images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Use timestamp to avoid filename collisions
  }
});

const upload = multer({ storage });  // Initialize multer with the storage configuration

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product (Admin only)
 * @access  Private (you can add authentication middleware here if needed)
 */
router.post('/', upload.single('image'), createProduct);  // Use upload.single('image') to handle the image upload

module.exports = router;
