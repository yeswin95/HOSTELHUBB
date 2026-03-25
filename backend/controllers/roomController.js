const Room = require('../models/Room');

const getRooms = async (req, res) => {
  try {
    const items = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch rooms' });
  }
};

const getRoomById = async (req, res) => {
  try {
    const item = await Room.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch room' });
  }
};

const createRoom = async (req, res) => {
  try {
    const item = await Room.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create room' });
  }
};

const updateRoom = async (req, res) => {
  try {
    const item = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update room' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const item = await Room.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete room' });
  }
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
