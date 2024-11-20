const Product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, category, description, price, stock, image } = req.body;

        const product = await Product.create({
            name,
            category,
            description,
            price,
            stock,
            image,
            createdBy: req.user.id,
        });

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();  // Fetch all products from the database
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);  // Return the list of products
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};