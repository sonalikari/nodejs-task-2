const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/register', validationMiddleware.validateRegistration, userController.registerUser);
router.post('/login', validationMiddleware.validateLogin, userController.loginUser);

router.get('/get', authMiddleware.validateAccessToken, userController.getUserData);
router.put('/delete', authMiddleware.validateAccessToken, userController.deleteUserData);

router.get('/list/:page', userController.getUserList);

module.exports = router;