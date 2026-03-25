const Attendance = require('../models/Attendance');

const getAttendance = async (req, res) => {
  try {
    const items = await Attendance.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch attendance' });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const item = await Attendance.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch attendance record' });
  }
};

const createAttendance = async (req, res) => {
  try {
    const item = await Attendance.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create attendance' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const item = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update attendance' });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const item = await Attendance.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete attendance' });
  }
};

module.exports = {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
