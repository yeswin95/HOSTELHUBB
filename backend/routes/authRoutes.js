// Routes for authentication-related endpoints (signup and login).
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// POST /api/signup
router.post('/signup', registerUser);

// POST /api/login
router.post('/login', loginUser);

module.exports = router;
