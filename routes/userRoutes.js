const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middleware/validationMiddleware');

// Routes
router.post('/register', validationMiddleware.validateRegistration, userController.registerUser);

module.exports = router;
