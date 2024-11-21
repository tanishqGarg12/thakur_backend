const Review = require('../models/review');
const Product = require('../models/product');

// Add a review
exports.addReview = async (req, res) => {
    try {
        const {  rating, comment } = req.body;
        console.log("tfdsdcsxc wsd")
        // Find the product by its ID
        // const product = await Product.findById(productId);
        // if (!product) {
        //     return res.status(404).json({ message: 'Product not found' });
        // }

        // Create the review

        const review = await Review.create({
            // product: productId,
            // user: req.user.id,
            rating,
            comment,
        });

        // Add the review to the product's reviews array
        // product.reviews.push(review._id); // Push the review's ID into the product's reviews array
        // await product.save(); // Save the updated product with the new review

        // Respond with success
        res.status(201).json({
            message: 'Review added successfully',
            review,
        });
    } catch (error) {
        console.log(error)
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
exports.getAllReviews = async (req, res) => {
    try {
        // Fetch all reviews from the database
        const reviews = await Review.find()

        // Send the reviews in the response
        res.status(200).json(reviews);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        // Find and delete the review by ID
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
