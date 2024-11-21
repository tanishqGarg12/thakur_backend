const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String },
        category: { type: String },
        description: { type: String },
        price: { type: Number },
        stock: { type: Number, default: 0 }, // Quantity available
        image: { type: String }, // URL of the product image
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the user who added the product
            // required: true,
        },
        reviews: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Review' 
        }],
        payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
