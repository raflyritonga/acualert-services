require('dotenv').config();
const express = require('express');
const router = express.Router();
const BASE_PATH = process.env.BASE_PATH

const {signUp, signIn, signOut} = require('../controllers/authController')
const updateProfile = require('../controllers/profileController')

router.get(BASE_PATH, (_req, res) => {
     res.send('Welcome to Acualert API Services');
});

// SignUp Route
router.post(BASE_PATH + '/signup', signUp);

// SignIn Route
router.post(BASE_PATH + '/signin', signIn);

// SignOut Route
router.post(BASE_PATH + '/signout', signOut);

// Update Profile Route
router.put(BASE_PATH + '/update-profile/:userId', updateProfile);

module.exports = router;
