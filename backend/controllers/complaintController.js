const Complaint = require('../models/Complaint');

const getComplaints = async (req, res) => {
  try {
    const items = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const item = await Complaint.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch complaint' });
  }
};

const createComplaint = async (req, res) => {
  try {
    const item = await Complaint.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create complaint' });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const item = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update complaint' });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const item = await Complaint.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete complaint' });
  }
};

module.exports = {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
};
