const { firestoreDb } = require('../config')

// GETTING ALL VEHICLES BY THE VEHICLE TYPE
const vehiclesByVehicleType = async (req, res, next) => {
     const vehicleType = req.params.vehicleType
     const vehiclesByTypeReff = firestoreDb.collection('vehicles').doc(`${vehicleType}`)
   
     try {
          const doc = await vehiclesByTypeReff.get()

          if (doc.exists) {
            const vehiclesData  = doc.data()
            return res.status(200).json(vehiclesData)
          } else {
            return res.status(404).json('Not Found')
          }
     } catch (error) {
          return res.status(500).json({ error: 'Internal Server Error' })
     }  
}

// ADD VEHICLES TO USER COLLECTION
const vehicleRegistration = async (req, res, next) => {
     const newVehicle = {
       userId: req.body.userId,
       vehicleType: req.body.vehicleType,
       vehicleMapName: req.body.vehicle
     };
   
     try {
       // Check if the vehicle exists in the "vehicles" collection
       const vehicleRef = firestoreDb.collection('vehicles').doc(newVehicle.vehicleType);
       const vehicleDoc = await vehicleRef.get();
   
       if (!vehicleDoc.exists) {
         return res.status(404).json('Vehicle not found');
       }
   
       const vehicleData = vehicleDoc.data();
       let vehicleDetails;
   
       if (vehicleData && vehicleData[newVehicle.vehicleMapName]) {
         vehicleDetails = vehicleData[newVehicle.vehicleMapName];
       } else {
         return res.status(404).json('Vehicle details not found');
       }
   
       // Check if the user exists in the "users" collection
       const userRef = firestoreDb.collection('users').doc(newVehicle.userId);
       const userDoc = await userRef.get();
   
       if (!userDoc.exists) {
         return res.status(404).json('User not found');
       }
   
       const userData = userDoc.data();
       const userVehicles = userData.vehicles || {};
   
       if (userVehicles[newVehicle.vehicleMapName]) {
         return res.status(404).json('Vehicle already exists');
       }
   
       // Add the new vehicle to the user's vehicles map
       userVehicles[newVehicle.vehicleMapName] = vehicleDetails;
   
       // Update the user's document with the new vehicles data
       await userRef.update({
         vehicles: userVehicles
       });
   
       return res.status(200).json('Vehicle registration succeeded');
     } catch (err) {
       console.error(err); // Log the error for debugging
       return res.status(500).json(`message: ${err.message}`);
     }
} 


// DELETE VEHICLE
const deleteVehicle = async (req, res, next) => {
     const deletingVehicle = {
          userId: req.body.userId,
          vehicleMapName: req.body.vehicle
     }
     
     try {
          // Check if the user exists in the "users" collection
          const userRef = firestoreDb.collection('users').doc(deletingVehicle.userId)
          const userDoc = await userRef.get()
     
          if (!userDoc.exists) {
          return res.status(404).json({error: 'User not found'})
          }
     
          const userData = userDoc.data()
          const userVehicles = userData.vehicles || {}
     
          if (!userVehicles[deletingVehicle.vehicleMapName]) {
               return res.status(404).json({error: 'Vehicle not found'})
          } else{
               // Remove the vehicle from the user's vehicles
               delete userVehicles[deletingVehicle.vehicleMapName];

               // Update the user's document without the deleted vehicle
               await userRef.update({
                    vehicles: userVehicles
               });
               
               return res.status(200).json('Vehicle deleted successfully');
          }          
     } catch (err) {
          return res.status(500).json(`message: ${err.message}`);
     }
}

const customHeight = async (req, res, next) => {

     const dataUpdation = {
          userId : req.body.userId,
          vehicleMapName : req.body.vehicle,
          editedGroundClearance : req.body.groundClearance
     }

     try {
          // Check if the user exists in the "users" collection
          const userRef = firestoreDb.collection('users').doc(dataUpdation.userId)
          const userDoc = await userRef.get()
               
          if (!userDoc.exists) {
               return res.status(404).json({error: 'User not found'})
          }

          // check if user has the vehicle
          const userData = userDoc.data()
          const userVehicles = userData.vehicles || {}
     
          if (!userVehicles[dataUpdation.vehicleMapName]) {
               // console.log(userVehicles[dataUpdation.vehicleMapName])
               return res.status(404).json({error: 'Vehicle not found'})
          } else{
               // Update the height of the specified vehicle
               const updatedUserVehicles = { ...userVehicles }
               updatedUserVehicles[dataUpdation.vehicleMapName]['ground-clearance'] = dataUpdation.editedGroundClearance

               await userRef.update({ vehicles: updatedUserVehicles })

               return res.status(200).json({ message: 'Vehicle height updated successfully' });
          }
     } catch (err) {
          return res.status(500).json(`message: ${err.message}`);
     }

}

module.exports = {vehiclesByVehicleType, vehicleRegistration, deleteVehicle, customHeight}