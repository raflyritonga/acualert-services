require('dotenv').config()
const express = require('express')
const routes = require('./routes/route')
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(routes)

function serverConn() {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  });
}

module.exports = serverConn;
