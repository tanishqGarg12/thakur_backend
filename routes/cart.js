const express = require('express');
const { addToCart, getCart, updateCart, removeFromCart, clearCart } = require('../controller/cart');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Protected Routes
router.post('/', authenticate, addToCart);       // Add product to cart
router.get('/', authenticate, getCart);          // Get user's cart
router.put('/', authenticate, updateCart);       // Update product quantity in cart
router.delete('/:productId', authenticate, removeFromCart);  // Remove product from cart
router.delete('/clear', authenticate, clearCart); // Clear user's cart

module.exports = router;
