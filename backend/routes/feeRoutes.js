const express = require('express');
const {
  getFees,
  getFeeById,
  createFee,
  updateFee,
  deleteFee,
} = require('../controllers/feeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getFees);
router.get('/:id', getFeeById);
router.post('/', authMiddleware, createFee);
router.put('/:id', authMiddleware, updateFee);
router.delete('/:id', authMiddleware, deleteFee);

module.exports = router;
