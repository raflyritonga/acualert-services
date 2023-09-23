const serverConn = require('./server');
const {storeDb, firestoreDb, firebaseAdmin} = require('./config')

serverConn()
try {
     if (storeDb && firestoreDb && firebaseAdmin) {
          console.log('Firestore connected');
          console.log('Store connected');
     } else {
          console.log('Some Firebase connections are missing.');
     }
} catch (err) {
     console.log(err)
}