require('dotenv').config();
const express = require('express');
const routes = require('./routes/route');
const PORT = process.env.PORT || 30000;
const BASE_PATH = process.env.BASE_PATH;

const app = express();
app.use(express.json());
app.use(BASE_PATH, routes);

function serverConn() {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = serverConn;
