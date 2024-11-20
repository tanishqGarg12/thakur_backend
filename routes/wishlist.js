const express = require('express');
const {
    addToWishlist,
    removeFromWishlist
} = require('../controller/wishlist');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Protected Routes
router.post('/add', authenticate, addToWishlist);     // Add product to wishlist
router.delete('/remove', authenticate, removeFromWishlist);  // Remove product from wishlist

module.exports = router;
