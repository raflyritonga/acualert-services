const serviceAccount = require('./firebase-credential.json');
const admin = require("firebase-admin");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestoreDb = admin.firestore();
const storeDb = admin.storage();

module.exports = { storeDb, firestoreDb, firebaseAdmin };