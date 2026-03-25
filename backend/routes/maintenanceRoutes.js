const express = require('express');
const {
  getMaintenanceRequests,
  getMaintenanceRequestById,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
} = require('../controllers/maintenanceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMaintenanceRequests);
router.get('/:id', getMaintenanceRequestById);
router.post('/', authMiddleware, createMaintenanceRequest);
router.put('/:id', authMiddleware, updateMaintenanceRequest);
router.delete('/:id', authMiddleware, deleteMaintenanceRequest);

module.exports = router;
