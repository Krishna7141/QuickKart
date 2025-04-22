const express = require('express');
const { addToCart, getCartItems } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');  // Ensure the path is correct based on your folder structure
const router = express.Router();

/**
 * @route   POST /api/cart
 * @desc    Add an item to the cart
 * @access  Private (requires authentication)
 */
router.post('/', authMiddleware, addToCart);

/**
 * @route   GET /api/cart
 * @desc    Get all items in the user's cart
 * @access  Private (requires authentication)
 */
router.get('/', authMiddleware, getCartItems);

module.exports = router;
