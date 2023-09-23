// const libphonenumber = require('google-libphonenumber');
const { firestoreDb } = require('../config');
const bcrypt = require('bcryptjs');


const signUp = async (req, res) =>{

  const newUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  try {
    const hashedPass = await bcrypt.hash(newUser.password, 10);
    // Adding new user to the account collection
    const addingNewAccount = () => {
      firestoreDb.collection('accounts')
      .add(newUser.email, newUser.hashedPass)
    }
    
    // get the new user Id
    const snapshot = await addingNewAccount.get()
    const id = snapshot.docs.map((doc) => doc.id)

    // adding new user to the users collection based on id
    const addingNewUser = () => {
      firestoreDb.collection('users')
      .doc(id)
      .set(newUser.email, newUser.fullName, newUser.phone)
    }

    return res.status(200).json('User Registered')
  } catch (e) {
    return res.status(400).json(`message: ${e.message}`)
  }
}

// const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// const signUp = async (req, res, next) => {
//   const user = {
//     fullName: req.body.fullName,
//     email: req.body.email,
//     phone: req.body.phone,
//     password: req.body.password,
//   };

//   try {
//     // Validate and format the phone number
//     const parsedPhoneNumber = phoneUtil.parse(user.phone, 'ID'); // Replace 'US' with the appropriate country code

//     if (!phoneUtil.isValidNumber(parsedPhoneNumber)) {
//       return res.status(400).json({ message: 'Invalid phone number' });
//     }

//     const formattedPhoneNumber = phoneUtil.format(parsedPhoneNumber, libphonenumber.PhoneNumberFormat.E164);

//     // Create a user using Firebase Authentication
//     await firebaseAdmin.auth().createUser({
//       displayName: user.fullName,
//       email: user.email,
//       phoneNumber: formattedPhoneNumber, // Use the formatted phone number
//       password: user.password, // Firebase will securely handle password hashing
//     });

//     return res.status(200).json('User Registered');
//   } catch (error) {
//     return res.status(404).json(error.message);
//   }
// };

// const signIn = async (req, res, next) => {
//      const { email, password } = req.body;
   
//      try {
//        // Find the user by email
//        const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
   
//        // Check if the user exists
//        if (!userRecord) {
//          return res.status(404).json({ message: 'User not found' });
//        }

//        if (userRecord.password !== password) {
//          return res.status(401).json({ message: 'Invalid password' });
//        }
   
//        // If email and password are correct, return a success response
//        return res.status(200).json({ message: 'Login successful' });
//      } catch (error) {
//        return res.status(500).json({ message: error.message });
//      }
//    };

// const signOut = async (req, res, next) => {
//      try {
//        // Get the Firebase UID of the currently authenticated user
//        const uid = req.user.uid; // You need to have middleware that verifies the user's authentication and stores user information in req.user
   
//        // Sign the user out
//        await adminss.auth().revokeRefreshTokens(uid);
   
//        return res.status(200).json({ message: 'Signout successful' });
//      } catch (error) {
//        return res.status(500).json({ message: error.message });
//      }
//    };


module.exports = { signUp };
