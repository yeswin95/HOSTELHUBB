const Fee = require('../models/Fee');

const getFees = async (req, res) => {
  try {
    const items = await Fee.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch fees' });
  }
};

const getFeeById = async (req, res) => {
  try {
    const item = await Fee.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch fee' });
  }
};

const createFee = async (req, res) => {
  try {
    const item = await Fee.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create fee' });
  }
};

const updateFee = async (req, res) => {
  try {
    const item = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update fee' });
  }
};

const deleteFee = async (req, res) => {
  try {
    const item = await Fee.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete fee' });
  }
};

module.exports = {
  getFees,
  getFeeById,
  createFee,
  updateFee,
  deleteFee,
};
