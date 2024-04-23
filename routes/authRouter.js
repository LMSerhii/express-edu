const { Router } = require('express');
const {
  checkSignupData,
  checkLoginData,
} = require('../middlewares/authMiddlewares');
const { signup, login } = require('../controllers/authControllers');

const router = Router();

// checkSignupData, signup
router.post('/signup', checkSignupData, signup);

// checkLoginData, login
router.post('/login', checkLoginData, login);

module.exports = { authRouter: router };
