const express = require('express');
const {
    addReview,
    getProductReviews,
    deleteReview,
    getAllReviews
} = require('../controller/review');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Protected Routes
router.post('/review', authenticate, addReview);                     // Add a review
router.get('/reviews/:productId', authenticate, getProductReviews);
router.get('/all',getAllReviews)  // Get all reviews for a product
router.delete('/review/:id', authenticate, deleteReview);            // Delete a review

module.exports = router;
