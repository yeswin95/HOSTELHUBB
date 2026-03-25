const express = require('express');
const {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAttendance);
router.get('/:id', getAttendanceById);
router.post('/', authMiddleware, createAttendance);
router.put('/:id', authMiddleware, updateAttendance);
router.delete('/:id', authMiddleware, deleteAttendance);

module.exports = router;
