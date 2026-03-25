const express = require('express');
const { getStudentCount, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/users/students/count
router.get('/students/count', getStudentCount);

// PUT /api/users/updateProfile
router.put('/updateProfile', authMiddleware, updateProfile);

module.exports = router;

