const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('./creds.json');
const admin = require("firebase-admin");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestoreDb = getFirestore();
const storeDb = getStorage();

module.exports = { storeDb, firestoreDb, firebaseAdmin };