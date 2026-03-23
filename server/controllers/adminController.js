const User = require('../models/User');
const PredictionLog = require('../models/PredictionLog');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all prediction logs
// @route   GET /api/admin/logs
// @access  Private/Admin
const getLogs = async (req, res) => {
    try {
        const logs = await PredictionLog.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUsers, getLogs };
