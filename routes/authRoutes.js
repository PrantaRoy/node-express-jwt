const express = require('express');
const { registerUser , authUser, getProfile} = require ('../controllers/authController');
const {checklogin} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', checklogin, getProfile);

module.exports = router ;