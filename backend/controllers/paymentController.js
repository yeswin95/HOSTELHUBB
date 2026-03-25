const Payment = require('../models/Payment');

const getPayments = async (req, res) => {
  try {
    const items = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const item = await Payment.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch payment' });
  }
};

const createPayment = async (req, res) => {
  try {
    const item = await Payment.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create payment' });
  }
};

const updatePayment = async (req, res) => {
  try {
    const item = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update payment' });
  }
};

const deletePayment = async (req, res) => {
  try {
    const item = await Payment.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete payment' });
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
