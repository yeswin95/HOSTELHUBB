const express = require('express');
const {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} = require('../controllers/noticeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getNotices);
router.get('/:id', getNoticeById);
router.post('/', authMiddleware, createNotice);
router.put('/:id', authMiddleware, updateNotice);
router.delete('/:id', authMiddleware, deleteNotice);

module.exports = router;
