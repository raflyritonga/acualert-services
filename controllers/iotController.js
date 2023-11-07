const axios = require('axios');
const ACCESS_TOKEN = process.env.BLYNK_API_TOKEN
const BASE_URL = process.env.BASE_BLYNK_API_URL

// FETCHING WATER LEVEL REAL TIME DATA FROM BLYNK'S API
const fetchWaterLevelData = async (_req, res) => {
     const url = BASE_URL + ACCESS_TOKEN;
     try {
          const response = await axios.get(url);
          console.log('Water Level Data:', response.data); // Log the data
          return res.status(200).json(response.data);
     } catch (err) {
          console.error('Error fetching water level data:', err); // Log the error
          return res.status(500).json({ message: err.message });
     }
};

// FETCHING LATITUDE
const fetchLat = async (_req, res) => {
     const url = BASE_URL + ACCESS_TOKEN + 'v3';
     try {
          const response = await axios.get(url);
          console.log('Latitude:', response.data); // Log the data
          return res.status(200).json(response.data);
     } catch (err) {
          console.error('Error fetching Latitude:', err); // Log the error
          return res.status(500).json({ message: err.message });
     }
};

// FETCHING LONGITUDE
const fetchLong = async (_req, res) => {
     const url = BASE_URL + ACCESS_TOKEN + 'v4';
     try {
          const response = await axios.get(url);
          console.log('Longitude:', response.data); // Log the data
          return res.status(200).json(response.data);
     } catch (err) {
          console.error('Error fetching longitude:', err); // Log the error
          return res.status(500).json({ message: err.message });
     }
};

module.exports = {fetchWaterLevelData, fetchLat, fetchLong}
