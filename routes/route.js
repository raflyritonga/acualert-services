require('dotenv').config();
const express = require('express');
const router = express.Router();
const BASE_PATH = process.env.BASE_PATH

const {signUp, signIn} = require('../controllers/authController')

// const {allVehicles} = require('../controllers/vehiclesController')
// const {signUp} = require('../controllers/authController')

router.get(BASE_PATH, (_req, res) => {
     res.send('Welcome to Acualert API Services');
});

// SignUp Route
router.post(BASE_PATH + '/signup', signUp);

// SignUp Route
router.post(BASE_PATH + '/signin', signIn);


module.exports = router;
