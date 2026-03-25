const express = require('express');
const { getStudentRoom, getStudentAttendance } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/room/:studentId', authMiddleware, getStudentRoom);
router.get('/attendance/:studentId', authMiddleware, getStudentAttendance);

module.exports = router;
