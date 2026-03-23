const express = require('express');
const router = express.Router();
const { makePrediction, getHistory } = require('../controllers/predictionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, makePrediction);
router.get('/history', protect, admin, getHistory);

module.exports = router;
