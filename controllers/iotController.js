const axios = require('axios');
const ACCESS_TOKEN = process.env.WATER_LEVEL_API_TOKEN
const BASE_URL = process.env.WATER_LEVEL_BASE_URL

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

module.exports = {fetchWaterLevelData}
