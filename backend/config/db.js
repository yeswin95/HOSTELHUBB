// Database configuration and connection helper for MongoDB Atlas using Mongoose.
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are defaults in newer Mongoose versions but kept for clarity.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

