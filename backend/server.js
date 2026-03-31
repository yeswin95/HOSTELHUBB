// Entry point for the HostelHub backend API server.
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const FoodMenu = require('./models/FoodMenu');
const Notice = require('./models/Notice');
const Hostel = require('./models/Hostel');
const Room = require('./models/Room');

// Load environment variables from .env file.
dotenv.config();

// Connect to MongoDB Atlas.
connectDB();

const app = express();

// Enable CORS so the frontend can access backend APIs from any origin.
const corsOptions = {
  origin: (origin, callback) => callback(null, true),
  credentials: true,
};
app.use(cors(corsOptions));
app.options('/*', cors(corsOptions));

// Parse incoming JSON request bodies.
app.use(express.json());

// Basic health check route.
app.get('/', (req, res) => {
  res.json({ message: 'HostelHub backend is running' });
});

// Route modules.
const authRoutes = require('./routes/authRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const feeRoutes = require('./routes/feeRoutes');
const foodMenuRoutes = require('./routes/foodMenuRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const roomRoutes = require('./routes/roomRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Mount API routes.
// Auth endpoints: /api/auth/signup, /api/auth/login
app.use('/api/auth', authRoutes);

// Other domain endpoints
app.use('/api/hostels', hostelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/foodmenu', foodMenuRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

const seedDefaultData = async () => {
  try {
    const menuCount = await FoodMenu.countDocuments();
    if (menuCount === 0) {
      await FoodMenu.create({
        day: 'Monday',
        breakfast: 'Bread & Jam',
        lunch: 'Rice, Dal',
        snacks: 'Samosa',
        dinner: 'Roti, Curry',
      });
    }
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      await Notice.create({
        title: 'Welcome',
        content: 'HostelHub is now live.',
      });
    }
    const hostelCount = await Hostel.countDocuments();
    let hostelId;
    if (hostelCount === 0) {
      const hostel = await Hostel.create({
        name: 'Hostel A',
        location: 'Campus',
        price: 2500,
      });
      hostelId = hostel._id;
    } else {
      const anyHostel = await Hostel.findOne();
      hostelId = anyHostel?._id;
    }
    const roomCount = await Room.countDocuments({ hostelId });
    if (hostelId && roomCount === 0) {
      await Room.create({
        hostelId,
        roomNumber: '101',
        capacity: 3,
        occupied: 0,
      });
    }
  } catch (e) {
    console.error('Seeding error:', e.message);
  }
};

seedDefaultData();

// Global error handler fallback.
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Unexpected server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`HostelHub backend server running on port ${PORT}`);
});

