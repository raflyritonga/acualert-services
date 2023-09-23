// const libphonenumber = require('google-libphonenumber');
const { firestoreDb } = require('../config');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) =>{

  const user = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  try {
    // Check if the email already exists in the "accounts" collection
    const emailQuerySnapshot = await firestoreDb
    .collection('accounts')
    .where('email', '==', user.email)
    .get();
  
    if (!emailQuerySnapshot.empty) {
      return res.status(400).json('Email already exists');
    }

    // hashing the password
    const hashedPass = await bcrypt.hash(user.password, 10);

    // Add the new user to the "accounts" collection
    const accountDocRef = await firestoreDb.collection('accounts').add({
      email: user.email,
      password: hashedPass, // Store the hashed password in Firestore
    });

    // Get the generated user ID
    const userId = accountDocRef.id;
    
    // Add additional user data to the "users" collection based on the user ID
    await firestoreDb.collection('users').doc(userId).set({
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    });

    return res.status(200).json('User Registered')
  } catch (e) {
    return res.status(400).json(`message: ${e.message}`)
  }
}

const signIn = async (req, res) => {
  const account = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Query the Firestore collection for the user with the provided email
    const emailQuerySnapshot = await firestoreDb
      .collection('accounts')
      .where('email', '==', account.email)
      .get();

    // Check if any user with the provided email exists
    if (emailQuerySnapshot.empty) {
      return res.status(400).json('Email not found');
    }

    // Assuming there's only one matching user, get their data
    const userDoc = emailQuerySnapshot.docs[0];
    const userData = userDoc.data();

    // Compare the provided password with the hashed password from Firestore
    const isPasswordValid = await bcrypt.compare(account.password, userData.password);
    
    if (isPasswordValid) {
      // Authentication successful; you can generate a JWT here if needed
      // You can also send a success response
      console.log("setelah auth")
      console.log(userData)
      return res.status(200).json('Authentication successful');
    } else {
      return res.status(400).json('Password is wrong');
    }
  } catch (e) {
    console.error('Error during sign-in:', e);
    return res.status(500).json('Internal server error');
  }
};


async function getUserByEmail(emial){
  
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


module.exports = { signUp, signIn };
