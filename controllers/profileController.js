const { firestoreDb } = require('../config');

const updateProfile = async (req, res) => {
     const userId = req.params.userId 

     const updatedData = {
       fullName: req.body.fullName,
       phone: req.body.phone,
     };
   
     try {
       // Assuming you have a reference to the Firestore collection where user profiles are stored
       const userProfileRef = firestoreDb.collection('users').doc(userId)
   
       // Check if the user exists in the database
       const userProfile = await userProfileRef.get()
   
       if (!userProfile.exists) {
         return res.status(404).json({ message: 'User not found' })
       }
   
       // Update the user's profile data
       await userProfileRef.update(updatedData)
   
       return res.status(200).json({ message: 'Profile updated successfully' })
     } catch (error) {
       return res.status(500).json(`message: ${error.message}`)
     }
   };  

module.exports = updateProfile