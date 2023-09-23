require('dotenv').config();
const express = require('express');
const router = express.Router();

const {allVehicles} = require('../controllers/vehiclesController')
const {signUp} = require('../controllers/authController')

router.get(process.env.BASE_PATH, (_req, res) => {
     res.send('Welcome to Acualert API Services');
});


// SignUp Route
router.post('/signup', signUp);

// SignIN Route
// router.post('/signin', signIn);

// // SignOut Route
// router.post('/signout', signOut);













router.get('/allvehicles', allVehicles);



module.exports = router;
