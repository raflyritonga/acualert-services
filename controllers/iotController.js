const axios = require('axios');
const WATER_LEVEL_ACCESS_TOKEN = process.env.REAL_TIME_WATER_LEVEL_TOKEN_BLYNK_API

// FETCHING WATER LEVEL REAL TIME DATA FROM BLYNK'S API
const fetchWaterLevelData = async (req, res, next) => {
     const url = `https://sgp1.blynk.cloud/external/api/get?token=${WATER_LEVEL_ACCESS_TOKEN}`
     try {
          const response = await axios.get(url);
          return res.status(200).json({ waterLevel: response.data})
     } catch (err) {
          return res.status(500).json(`message: ${err.message}`)
     }
}

module.exports = {fetchWaterLevelData}
