const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const payment =require("./routes/payment")
const wishlist=require("./routes/wishlist")
const cart =require("./routes/cart")
const database = require("./config/database");
const cors=require('cors')

// Initialize dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies
app.use(cors());
// Basic route
app.get('/', (req, res) => {
    res.send('Boat Website Backend Running!');
});

// API Routes
app.use('/api/v1/users', userRoutes);    // User routes
app.use('/api/v1/products', productRoutes); // Product routes
app.use('/api/v1/reviews', reviewRoutes);   // Review routes
app.use('/api/v1/payment', payment);   // Review routes
app.use('/api/v1/wishlist', wishlist);   // Review routes
app.use('/api/v1/cart', cart);   // Review routes

// Error handling middleware (optional, to handle invalid routes)
// app.use((req, res, next) => {
//     res.status(404).json({ message: 'Route not found' });
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
database.connect();
