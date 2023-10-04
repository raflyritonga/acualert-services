const { firestoreDb } = require('../config')

// GETTING ALL VEHICLES BY THE USER ID
const vehiclesByUserId = async (req, res, next) => {
     const userId = req.params.userId
     
     try {
          const userVehiclesRef = firestoreDb.collection('users').doc(userId)
          const userVehiclesDoc = await userVehiclesRef.get()
          
          if (!userVehiclesDoc.exists) {
               return res.status(404).json({error: 'User not found'})
          }
          
          const userVehiclesData = userVehiclesDoc.data()
          const userVehiclesDetails = userVehiclesData.vehicles
          return res.status(200).json(userVehiclesDetails)

     } catch (err) {
          return res.status(500).json({ error: `message: ${err.message}` })
     }  
}

const userDataByUserId = async (req, res, next) => {
     const userId = req.params.userId
     
     try {
          const userDataRef = firestoreDb.collection('users').doc(userId)
          const userDataDoc = await userDataRef.get()
          
          if (!userDataDoc.exists) {
               return res.status(404).json({error: 'User not found'})
          }
          
          const userData = userDataDoc.data()
          console.log(userData)
          return res.status(200).json(userData)

     } catch (err) {
          return res.status(500).json({ error: `message: ${err.message}` })
     }  
}

module.exports = {vehiclesByUserId, userDataByUserId}