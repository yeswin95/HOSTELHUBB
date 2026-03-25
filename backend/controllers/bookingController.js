// Booking controller for creating and retrieving hostel bookings.
const Booking = require('../models/Booking');

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { hostelId, bookingDate, roomId } = req.body;

    if (!hostelId || !bookingDate) {
      return res.status(400).json({ message: 'Hostel and booking date are required' });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      hostelId,
      bookingDate,
      status: 'pending',
      roomId,
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    console.error('Create booking error:', error.message);
    return res.status(500).json({ message: 'Failed to create booking' });
  }
};

// GET /api/bookings/:userId
const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure users can only view their own bookings.
    if (String(req.user.id) !== String(userId)) {
      return res.status(403).json({ message: 'You are not allowed to view these bookings' });
    }

    const bookings = await Booking.find({ userId })
      .populate('hostelId', 'name location price')
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

module.exports = {
  createBooking,
  getBookingsByUser,
};

