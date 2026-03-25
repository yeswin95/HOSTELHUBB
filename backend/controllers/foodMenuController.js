const FoodMenu = require('../models/FoodMenu');

const getFoodMenus = async (req, res) => {
  try {
    const items = await FoodMenu.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch food menus' });
  }
};

const getFoodMenuById = async (req, res) => {
  try {
    const item = await FoodMenu.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch food menu' });
  }
};

const createFoodMenu = async (req, res) => {
  try {
    const item = await FoodMenu.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create food menu' });
  }
};

const updateFoodMenu = async (req, res) => {
  try {
    const item = await FoodMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update food menu' });
  }
};

const deleteFoodMenu = async (req, res) => {
  try {
    const item = await FoodMenu.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete food menu' });
  }
};

module.exports = {
  getFoodMenus,
  getFoodMenuById,
  createFoodMenu,
  updateFoodMenu,
  deleteFoodMenu,
};
