const express = require('express');
const { registerUser, login, getUserDetails,updateUser,deleteUser, getAllUsers,deleteUserById } = require('../controller/user');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Public Routes
router.post('/register', registerUser); // User registration
router.post('/login', login);       // User login
router.get("/all",getAllUsers)
// Protected Route
router.get('/profile', authenticate, getUserDetails); // Get user profile
// Update user details
router.put('/update', authenticate, updateUser);
router.delete('/users/:id',deleteUserById);
// Delete user account
router.delete('/delete', authenticate, deleteUser);

module.exports = router;
