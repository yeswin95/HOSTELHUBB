const express = require('express');
const {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getComplaints);
router.get('/:id', getComplaintById);
router.post('/', authMiddleware, createComplaint);
router.put('/:id', authMiddleware, updateComplaint);
router.delete('/:id', authMiddleware, deleteComplaint);

module.exports = router;
