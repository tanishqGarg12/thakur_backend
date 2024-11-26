const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: {
          type: String,   // Add name field to store product name
          // required: true,
        },
        price: {
          type: Number,   // Add price field to store product price
          // required: true,
        },
        quantity: {
          type: Number,
          // required: true,
          min: 1,
        },
        image: { type: String }, 
      },
    ],
    status: {
      type: String,
      enum: ['active', 'purchased', 'abandoned'],
      default: 'active', // Active cart, purchased, or abandoned
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
