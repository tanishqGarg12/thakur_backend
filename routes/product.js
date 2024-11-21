const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controller/product');
const { authenticate, authorize ,isAdmin,isUser} = require('../middleware/auth');

const router = express.Router();

// Public Routes
router.get('/products', getAllProducts);       // Get all products
router.get('/product/:id', getProduct);        // Get a single product by ID

// Admin Protected Routes
router.post('/product', authenticate, createProduct);       // Create a product
router.put('/product/:id', authenticate,isAdmin, updateProduct);    // Update a product
router.delete('/product/:id', authenticate, isAdmin, deleteProduct); // Delete a product
// outer.get("all",authenticate,getAllProducts)
module.exports = router;
