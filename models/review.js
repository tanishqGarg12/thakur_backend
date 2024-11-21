const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product being reviewed
            // required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User writing the review
            // required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1, // Minimum rating
            max: 5, // Maximum rating
        },
        comment: {
            type: String,
            required: true,
            maxlength: 500, // Optional: Limit the length of the comment
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
