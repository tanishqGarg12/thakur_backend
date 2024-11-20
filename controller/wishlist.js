const Wishlist = require('../models/wishlist');
const Product = require('../models/product');

// Controller to add product to the wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body; // Get productId from the request body

        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user already has a wishlist
        let wishlist = await Wishlist.findOne({ user: req.user.id });

        // If the user doesn't have a wishlist, create a new one
        if (!wishlist) {
            wishlist = new Wishlist({
                user: req.user.id,
                products: [productId], // Add the product to the wishlist
            });
            await wishlist.save();
            return res.status(201).json({ message: 'Product added to wishlist', wishlist });
        }

        // If the wishlist exists, check if the product is already in the wishlist
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        // Add the product to the wishlist
        wishlist.products.push(productId);
        await wishlist.save();

        res.status(200).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.body; // Get productId from the request body

        // Find the user's wishlist
        const wishlist = await Wishlist.findOne({ user: req.user.id });
        
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Check if the product exists in the wishlist
        const productIndex = wishlist.products.indexOf(productId);
        
        if (productIndex === -1) {
            return res.status(400).json({ message: 'Product not found in wishlist' });
        }

        // Remove the product from the wishlist
        wishlist.products.splice(productIndex, 1); // Remove the product at the found index
        await wishlist.save();

        res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};