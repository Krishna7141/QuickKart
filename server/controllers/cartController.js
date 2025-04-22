const CartItem = require('../models/CartItem');

// Add an item to the cart
const addToCart = async (req, res) => {
  const { productId, quantity, userId } = req.body;

  try {
    // Check if the item already exists in the cart
    let cartItem = await CartItem.findOne({ productId, userId });

    if (cartItem) {
      // If it exists, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If it doesn't exist, create a new cart item
      cartItem = new CartItem({ productId, quantity, userId });
    }

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all cart items for a user
const getCartItems = async (req, res) => {
  const { userId } = req.query;

  try {
    const cartItems = await CartItem.find({ userId }).populate('productId');
    res.status(200).json(cartItems);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addToCart,
  getCartItems,
};
