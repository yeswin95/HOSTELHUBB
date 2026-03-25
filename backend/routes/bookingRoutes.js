// Routes for booking creation and retrieval by user.
const express = require('express');
const { createBooking, getBookingsByUser } = require('../controllers/bookingController');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/:userId', authMiddleware, getBookingsByUser);
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update booking' });
  }
});
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Booking.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete booking' });
  }
});

module.exports = router;

