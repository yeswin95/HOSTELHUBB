const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Hostel = require('./models/Hostel');
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Complaint = require('./models/Complaint');
const Fee = require('./models/Fee');
const Payment = require('./models/Payment');
const Menu = require('./models/FoodMenu');

dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not set in environment');
  process.exit(1);
}

const connect = async () => {
  await mongoose.connect(uri);
  console.log('Seeding: connected to MongoDB');
};

const clearCollections = async () => {
  await Promise.all([
    User.deleteMany({}),
    Hostel.deleteMany({}),
    Room.deleteMany({}),
    Booking.deleteMany({}),
    Complaint.deleteMany({}),
    Fee.deleteMany({}),
    Payment.deleteMany({}),
    Menu.deleteMany({}),
  ]);
  console.log('Cleared existing data from collections');
};

const seed = async () => {
  await connect();
  await clearCollections();

  const salt = await bcrypt.genSalt(10);
  const rahulPassword = await bcrypt.hash('Password@123', salt);

  const rahul = await User.create({
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    password: rahulPassword,
    phone: '9999999999',
    role: 'student',
  });
  console.log('Users seeded successfully');

  const boysHostel = await Hostel.create({
    name: 'Boys Hostel',
    location: 'Block A',
    price: 3000,
    facilities: ['WiFi', 'Laundry'],
  });
  const girlsHostel = await Hostel.create({
    name: 'Girls Hostel',
    location: 'Block B',
    price: 3200,
    facilities: ['WiFi', 'Laundry'],
  });
  console.log('Hostels seeded successfully');

  const room101 = await Room.create({
    hostelId: boysHostel._id,
    roomNumber: '101',
    capacity: 3,
    occupied: 1,
    students: [rahul._id],
  });
  console.log('Rooms seeded successfully');

  const booking = await Booking.create({
    userId: rahul._id,
    hostelId: boysHostel._id,
    roomId: room101._id,
    bookingDate: new Date(),
    status: 'confirmed',
  });
  console.log('Bookings seeded successfully');

  const complaint = await Complaint.create({
    studentId: rahul._id,
    category: 'Maintenance',
    message: 'Water leakage in bathroom',
    status: 'Pending',
  });
  console.log('Complaints seeded successfully');

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const monthLabel = nextMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  await Fee.create({
    studentId: rahul._id,
    amount: 5000,
    month: monthLabel,
    status: 'Unpaid',
  });
  console.log('Fees seeded successfully');

  await Payment.create({
    studentId: rahul._id,
    amount: 5000,
    method: 'Online',
    transactionId: 'TXN123456',
    status: 'Completed',
    paymentDate: new Date(),
  });
  console.log('Payments seeded successfully');

  const menus = [
    { day: 'Monday', breakfast: 'Idli', lunch: 'Rice + Sambar', snacks: 'Samosa', dinner: 'Chapati + Curry' },
    { day: 'Tuesday', breakfast: 'Dosa', lunch: 'Rice + Dal', snacks: 'Pakoda', dinner: 'Veg Biryani' },
    { day: 'Wednesday', breakfast: 'Pongal', lunch: 'Lemon Rice', snacks: 'Biscuits', dinner: 'Chapati + Paneer Curry' },
    { day: 'Thursday', breakfast: 'Upma', lunch: 'Curd Rice', snacks: 'Mirchi Bajji', dinner: 'Veg Fried Rice' },
    { day: 'Friday', breakfast: 'Poori', lunch: 'Sambar Rice', snacks: 'Bonda', dinner: 'Chapati + Dal' },
    { day: 'Saturday', breakfast: 'Vada', lunch: 'Veg Pulao', snacks: 'Corn', dinner: 'Noodles' },
    { day: 'Sunday', breakfast: 'Masala Dosa', lunch: 'Special Meals', snacks: 'Cake', dinner: 'Chapati + Kurma' },
  ];
  await Menu.insertMany(menus);
  console.log('Menu seeded successfully');
};

seed()
  .then(async () => {
    await mongoose.disconnect();
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Seeding error:', err.message);
    await mongoose.disconnect();
    process.exit(1);
  });
