const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');

// Add a product to the cart
exports.addToCart = async (req, res) => {
    const { productId,quantity,id} = req.body;
//   console.log(productId)

  try {
    // console.log("user isssss "+user.user)
    const product = await Product.findById(productId);
    // console.log(product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const id=req.user.id
    console.log("user id is "+ id)
    // cosnole.log("heloo")
    let cart = await Cart.findOne({ userId: id});
    // console.log(cart)

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity += quantity;
        item.total = item.quantity * product.price;
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({
          productId,
          name: product.name,
          quantity:quantity,
          price: product.price,
          total: product.price * quantity,
        });
      }
    } else {
      cart = new Cart({
        userId: id,
        items: [{
          productId,
          name: product.name,
          quantity,
          price: product.price,
          total: product.price * quantity,
        }],
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error', error });
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

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

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
        const userId = req.user.id;
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

