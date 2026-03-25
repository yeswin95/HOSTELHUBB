// Hostel controller with CRUD-style operations for hostel data.
const Hostel = require('../models/Hostel');

// GET /api/hostels
const getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find().sort({ createdAt: -1 });
    return res.status(200).json(hostels);
  } catch (error) {
    console.error('Get hostels error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch hostels' });
  }
};

// GET /api/hostels/:id
const getHostelById = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found' });
    }
    return res.status(200).json(hostel);
  } catch (error) {
    console.error('Get hostel by id error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch hostel' });
  }
};

// POST /api/hostels
const createHostel = async (req, res) => {
  try {
    const { name, location, price, facilities, description, images } = req.body;

    if (!name || !location || price === undefined) {
      return res.status(400).json({ message: 'Name, location and price are required' });
    }

    const hostel = await Hostel.create({
      name,
      location,
      price,
      facilities: facilities || [],
      description: description || '',
      images: images || [],
    });

    return res.status(201).json({
      message: 'Hostel created successfully',
      hostel,
    });
  } catch (error) {
    console.error('Create hostel error:', error.message);
    return res.status(500).json({ message: 'Failed to create hostel' });
  }
};

module.exports = {
  getHostels,
  getHostelById,
  createHostel,
};

