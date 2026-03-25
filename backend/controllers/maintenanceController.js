const MaintenanceRequest = require('../models/MaintenanceRequest');

const getMaintenanceRequests = async (req, res) => {
  try {
    const items = await MaintenanceRequest.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch maintenance requests' });
  }
};

const getMaintenanceRequestById = async (req, res) => {
  try {
    const item = await MaintenanceRequest.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch maintenance request' });
  }
};

const createMaintenanceRequest = async (req, res) => {
  try {
    const item = await MaintenanceRequest.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create maintenance request' });
  }
};

const updateMaintenanceRequest = async (req, res) => {
  try {
    const item = await MaintenanceRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update maintenance request' });
  }
};

const deleteMaintenanceRequest = async (req, res) => {
  try {
    const item = await MaintenanceRequest.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete maintenance request' });
  }
};

module.exports = {
  getMaintenanceRequests,
  getMaintenanceRequestById,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
};
