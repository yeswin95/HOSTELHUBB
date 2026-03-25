const Room = require('../models/Room');
const User = require('../models/User');
const Student = require('../models/Student');

const requireAdmin = (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ success: false, message: 'Admin access required' });
    return false;
  }
  return true;
};

const createRoom = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const { roomNumber, roomType, capacity } = req.body;
    const room = await Room.create({
      roomNumber,
      roomType: (roomType || 'single'),
      capacity,
      currentOccupancy: 0,
      occupants: [],
      status: 'available',
      hostelId: req.body.hostelId,
    });
    res.status(201).json({ success: true, room });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Failed to create room' });
  }
};

const getRooms = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const rooms = await Room.find().lean();
    res.status(200).json({ success: true, rooms });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
};

const assignRoom = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const { studentId, roomId } = req.body; // studentId is Student._id
    
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });
    
    // Check if room is full before doing anything
    const currentOcc = room.currentOccupancy || 0;
    if (currentOcc >= room.capacity) {
      return res.status(400).json({ success: false, message: 'Room is full' });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const user = await User.findById(student.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // If student already has a room, remove from previous room
    if (student.roomId && String(student.roomId) !== String(roomId)) {
      const prevRoom = await Room.findById(student.roomId);
      if (prevRoom) {
        prevRoom.occupants = (prevRoom.occupants || []).filter(id => String(id) !== String(user._id));
        prevRoom.currentOccupancy = Math.max(0, (prevRoom.currentOccupancy || 0) - 1);
        prevRoom.status = prevRoom.currentOccupancy >= prevRoom.capacity ? 'full' : 'available';
        await prevRoom.save();
      }
    }

    // Add to target room if not already present
    const isAlreadyOccupant = (room.occupants || []).some(id => String(id) === String(user._id));
    if (!isAlreadyOccupant) {
      room.occupants = room.occupants || [];
      room.occupants.push(user._id);
      room.currentOccupancy = currentOcc + 1;
    }
    room.status = room.currentOccupancy >= room.capacity ? 'full' : 'available';
    await room.save();

    // Update Student
    student.roomId = room._id;
    student.roomStatus = 'CONFIRMED';
    await student.save();

    // Update User for backward compatibility
    user.roomId = room._id;
    await user.save();

    res.status(200).json({ success: true, message: 'Room assigned', roomId: room._id, studentId: student._id });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Failed to assign room' });
  }
};

const getStudents = async (req, res) => {
  if (!requireAdmin(req, res)) return;
  try {
    const students = await Student.find().populate('roomId', 'roomNumber').lean();
    res.status(200).json({ success: true, students });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
};

module.exports = { createRoom, getRooms, assignRoom, getStudents };
