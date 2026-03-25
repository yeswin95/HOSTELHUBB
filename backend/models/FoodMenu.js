const mongoose = require('mongoose');

const foodMenuSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
    },
    breakfast: {
      type: String,
      required: true,
      trim: true,
    },
    lunch: {
      type: String,
      required: true,
      trim: true,
    },
    snacks: {
      type: String,
      required: true,
      trim: true,
    },
    dinner: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'menu',
  }
);

module.exports = mongoose.model('FoodMenu', foodMenuSchema);
