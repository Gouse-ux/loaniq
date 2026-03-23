const express = require('express');
const router = express.Router();
const { getUsers, getLogs } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/users', protect, admin, getUsers);
router.get('/logs', protect, admin, getLogs);

module.exports = router;
