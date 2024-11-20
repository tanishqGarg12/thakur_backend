const Payment = require('../models/payment');
const Product = require('../models/product');
const User = require('../models/user');

// Create a payment transaction
exports.createPayment = async (req, res) => {
    try {
        const { amount, productId} = req.body;

        // Ensure user is authenticated
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create the payment
        const payment = new Payment({
            userId: req.user.id,
            productId: productId,
            amount,
            paymentStatus: "Completed", // Default to 'Pending' if no status is provided
        });

        await payment.save();

        // Push the payment into the product's payments array
        product.payments.push(payment._id);
        await product.save();

        res.status(201).json({
            message: 'Payment created successfully',
            payment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all payments for a user
exports.getUserPayments = async (req, res) => {
    try {
        // Fetch all payments for the authenticated user
        const payments = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 });

        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this user' });
        }

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a payment transaction
// Delete a payment transaction
exports.deletePayment = async (req, res) => {
    try {
        const { paymentId } = req.body;

        // Find the payment by ID
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Ensure the payment belongs to the authenticated user
        if (payment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this payment' });
        }

        // Remove the payment ID from the product's payments array
        const product = await Product.findById(payment.productId);
        if (product) {
            product.payments.pull(paymentId);
            await product.save();
        }

        // Delete the payment using deleteOne
        await payment.deleteOne();

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

