const { storeDb, firestoreDb } = require('../config')

// GETTING ALL CARS DATA
const allVehicles = async(req, res, next) => {
     // const vehiclesType = req.params.type
     const VehiclesReff = firestoreDb.collection('vehicles').doc('cars')
     VehiclesReff.get()
     .then((doc) => {
       if (doc.exists) {
         const specificProduct = doc.data()
         return res.status(200).json(specificProduct)
     } else {
          return res.status(404).json('Not Found')
     }
})
     .catch((error) => {
          return res.status(404).json(error)
     });
} 

module.exports = {allVehicles}