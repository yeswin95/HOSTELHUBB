const User = require('../models/User');

// GET /api/users/students/count
// Returns total number of users with role === 'student'
const getStudentCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'student' });
    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error('Error fetching student count:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch student count',
    });
  }
};

// PUT /api/users/updateProfile
// Allows authenticated student to update name, phone, course
const updateProfile = async (req, res) => {
  try {
    const userId = req.user && req.user._id ? req.user._id : req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    const { name, phone, course } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }
    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: { name, phone, course: course || '' } },
      { new: true, runValidators: true, select: '-password' }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({
      success: true,
      user: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        role: updated.role,
        course: updated.course || '',
      },
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Update profile error:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

module.exports = {
  getStudentCount,
  updateProfile,
};

