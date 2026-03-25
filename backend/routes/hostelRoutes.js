// Routes for hostel listing, detail, and creation.
const express = require('express');
const { getHostels, getHostelById, createHostel } = require('../controllers/hostelController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getHostels);
router.get('/:id', getHostelById);
router.post('/', authMiddleware, createHostel);

module.exports = router;

