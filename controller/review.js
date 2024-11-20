const Review = require('../models/review');
const Product = require('../models/product');

// Add a review
exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create the review
        const review = await Review.create({
            product: productId,
            user: req.user.id,
            rating,
            comment,
        });

        // Add the review to the product's reviews array
        product.reviews.push(review._id); // Push the review's ID into the product's reviews array
        await product.save(); // Save the updated product with the new review

        // Respond with success
        res.status(201).json({
            message: 'Review added successfully',
            review,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all reviews for a product
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'firstName lastName');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the review belongs to the authenticated user or admin
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
