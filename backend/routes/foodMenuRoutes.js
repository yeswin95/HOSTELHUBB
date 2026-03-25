const express = require('express');
const {
  getFoodMenus,
  getFoodMenuById,
  createFoodMenu,
  updateFoodMenu,
  deleteFoodMenu,
} = require('../controllers/foodMenuController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getFoodMenus);
router.get('/:id', getFoodMenuById);
router.post('/', authMiddleware, createFoodMenu);
router.put('/:id', authMiddleware, updateFoodMenu);
router.delete('/:id', authMiddleware, deleteFoodMenu);

module.exports = router;
