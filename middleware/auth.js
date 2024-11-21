const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify the token
exports.authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        console.log("dsD"+token)
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Attach user details to the request

        if (!req.user) {
            return res.status(401).json({ message: 'User not found. Invalid token.' });
        }
        console.log("doneeeeeeee")
        next();
    } catch (error) {
      console.log(error)
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

// Middleware to check user roles
exports.isAdmin = async (req, res, next) => {
    try {
      const userDetails = await User.findOne({ email: req.user.email });
    console.log(userDetails)
      if (userDetails.role !== "admin") {
        return res.status(401).json({
          success: false,
          message: "This is a protected route for admins",
        });
      }
  
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "User role can't be verified",
      });
    }
  };
  
  // Middleware to check if the user is a normal user
  exports.isUser = async (req, res, next) => {
    try {
      const userDetails = await User.findOne({ email: req.user.email });
  
      if (userDetails.role !== "user") {
        return res.status(401).json({
          success: false,
          message: "This is a protected route for users",
        });
      }
      console.log("in the user panel")
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "User role can't be verified",
      });
    }
  };