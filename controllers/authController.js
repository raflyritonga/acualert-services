require('dotenv').config()
const generateToken = require('../middlewares/verifyToken')
const { firestoreDb } = require('../config');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY

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
      // Authentication successful
      const userId = userDoc.id
      let tokenData = {id: userId, email: userData.email}
      const expiresIn = 60 * 60 * 24 * 30; // 30 days
      const accessToken =  await generateToken(tokenData, SECRET_KEY, expiresIn)

      return res.status(200).json(`Token: ${accessToken}`);
    } else {
      return res.status(400).json('Password is wrong');
    }
  } catch (e) {
    console.error('Error during sign-in:', e);
    return res.status(500).json('Internal server error');
  }
};

const signOut = async (req, res) => {
  // In-memory token blacklist
  const tokenBlacklist = new Set(); 
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json('No token provided');
  }

  // Add the token to the blacklist
  tokenBlacklist.add(token);

  res.status(200).json({ message: 'Signout successful' });
}


module.exports = { signUp, signIn, signOut };
