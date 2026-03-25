const User = require('../models/User');
const Room = require('../models/Room');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

const getStudentRoom = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const user = await User.findById(studentId);
    if (!user) return res.status(404).json({ success: false, message: 'Student not found' });
    
    const studentRecord = await Student.findOne({ userId: studentId });
    const roomStatus = studentRecord ? studentRecord.roomStatus : 'PENDING';
    
    if (!user.roomId) {
      return res.status(200).json({ success: true, roomAssigned: false, message: 'No room assigned', roomStatus });
    }
    const room = await Room.findById(user.roomId).populate('occupants', 'name');
    const roommates = (room.occupants || [])
      .filter(u => String(u._id) !== String(user._id))
      .map(u => u.name);
    res.status(200).json({
      success: true,
      roomAssigned: true,
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      capacity: room.capacity,
      currentOccupancy: room.currentOccupancy || 0,
      roommates,
      roomStatus,
    });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch room details' });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const logs = await Attendance.find({ studentId }).sort({ date: -1 }).lean();
    const totalDays = logs.length;
    const presentDays = logs.filter(l => (l.status || '').toLowerCase() === 'present').length;
    const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    res.status(200).json({
      success: true,
      attendanceLog: logs.map(l => ({
        date: l.date,
        status: (l.status || '').toLowerCase(),
        timeIn: l.timeIn || '',
      })),
      percentage,
    });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch attendance' });
  }
};

module.exports = { getStudentRoom, getStudentAttendance };
