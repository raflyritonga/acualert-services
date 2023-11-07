require('dotenv').config();
const express = require('express');
const router = express.Router();
const BASE_PATH = process.env.BASE_PATH

const {signUp, signIn, signOut} = require('../controllers/authController')
const {vehiclesByVehicleType, vehicleRegistration, deleteVehicle, customGroundClearance} = require('../controllers/vehiclesController')
const {vehiclesByUserId, userDataByUserId} = require('../controllers/homeController')
const updateProfile = require('../controllers/profileController');
const { fetchWaterLevelData, fetchLat, fetchLong } = require('../controllers/iotController');

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
router.put(BASE_PATH + '/profile/update/:userId', updateProfile);

// Get all vehicle data by the vehicle type
router.get(BASE_PATH + '/vehicles/:vehicleType', vehiclesByVehicleType);

// Register new vehicle
router.put(BASE_PATH + '/vehicle-registration', vehicleRegistration);

// Delete vehicle
router.delete(BASE_PATH + '/vehicle-deletion', deleteVehicle);

// Get all user's vehicles on the home screen
router.get(BASE_PATH + '/home/:userId', vehiclesByUserId);

// Update the height to the custom one
router.put(BASE_PATH + '/vehicles/custom-ground-clearance', customGroundClearance);

// Fetch water level data
router.get(BASE_PATH + '/iot/water-level', fetchWaterLevelData);

// Fetch water level data
router.get(BASE_PATH + '/iot/lat1', fetchLat);

// Fetch water level data
router.get(BASE_PATH + '/iot/long1', fetchLong);

// Fetch user data
router.get(BASE_PATH + '/home/user/:userId', userDataByUserId);

module.exports = router;
