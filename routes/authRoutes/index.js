const express = require('express');
const authMiddleware = require('../../middlewares/auth/auth.middleware');
const authValidation = require('../../middlewares/validations/auth.validation');
const authController = require('../../controllers/authController');

const router = express.Router();

router.get('/login', authMiddleware.preventRedirectToLogin, authController.showLogin);

router.post('/login', authValidation.loginValidation, authController.login);

router.get('/register', authMiddleware.preventRedirectToLogin, authController.showRegister);

router.post('/register', authValidation.registerValidation, authController.register);

router.get('/logout', authController.logout);

module.exports = router;
