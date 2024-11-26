const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');

// Add a product to the cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Fetch the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Fetched Product:", product); // Debugging log

    const name = product?.name || "Unknown Product"; // Handle missing name

    // Get the user ID from req.user
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity += quantity;
        item.total = item.quantity * product.price;
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({
          productId: product._id,
          name, // Use the name retrieved from the product
          image:product.image,
          quantity,
          price: product.price,
          total: product.price * quantity,
        });
      }
    } else {
      cart = new Cart({
        userId,
        items: [
          {
            productId: product._id,
            name, // Use the name retrieved from the product
            image:product.image,
            quantity,
            price: product.price,
            total: product.price * quantity,
          },
        ],
      });
    }

    console.log("Cart Before Save:", cart); // Debugging log
    await cart.save();
    console.log("Added to Cart Successfully");


    res.status(201).json(cart);
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};



// Get the user's cart
// Get the user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find the cart and populate product details
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
        console.log(cart)

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the quantity of a product in the cart

// Update the quantity of a product in the cart
exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        // Find the user's cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Update the quantity and recalculate the total
        let item = cart.items[itemIndex];
        item.quantity = quantity;
        item.total = item.quantity * item.price;

        // Save the updated cart
        cart.items[itemIndex] = item;
        await cart.save();

        res.status(200).json({
            message: 'Cart updated successfully',
            cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  

// Remove a product from the cart
// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;
        console.log(userId)
        console.log("product is"+productId)

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        console.log("intem is"+itemIndex)

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Remove the product from the cart
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            message: 'Product removed from cart successfully',
            cart
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear the user's cart (e.g., after purchase)
exports.clearCart = async (req, res) => {
    try {
        console.log("-----------------")
        const userId = req.user.id;
        console.log(userId)
        console.log("int he cart")

        // Find and delete the user's cart
        await Cart.findOneAndDelete({ userId });

        res.status(200).json({
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

