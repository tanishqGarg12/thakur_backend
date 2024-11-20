const express = require('express');
const { createPayment, getUserPayments, updatePayment, deletePayment } = require('../controller/payment');
const { authenticate } = require('../middleware/auth'); // Assuming you have an auth middleware

const router = express.Router();

// Create a payment
router.post('/payment', authenticate, createPayment);

// Get all payments for the authenticated user
router.get('/payments',authenticate, getUserPayments);


// Delete a payment
router.delete('/payment', authenticate, deletePayment);

module.exports = router;
