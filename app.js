const serverConn = require('./server');
const {storeDb, firestoreDb, firebaseAdmin} = require('./config')

serverConn()
try {
     storeDb
     firestoreDb
     firebaseAdmin
     console.log('Firestore connected')
     console.log('Store connected')
} catch (err) {
     console.log(err)
}