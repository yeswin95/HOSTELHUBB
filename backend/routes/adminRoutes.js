const express = require('express');
const { createRoom, getRooms, assignRoom, getStudents } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/rooms', authMiddleware, createRoom);
router.get('/rooms', authMiddleware, getRooms);
router.post('/assign-room', authMiddleware, assignRoom);
router.get('/students', authMiddleware, getStudents);

module.exports = router;
