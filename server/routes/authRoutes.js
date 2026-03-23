const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, loginUser, getUserProfile, generateToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// Google Auth Routes
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL || 'https://loaniq-app.netlify.app'}/login` }),
    (req, res) => {
        const token = generateToken(req.user._id);
        res.redirect(`${process.env.CLIENT_URL || 'https://loaniq-app.netlify.app'}/?token=${token}`);
    }
);

module.exports = router;
