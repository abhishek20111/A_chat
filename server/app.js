const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./model/User');
const router = require('./routes/router');
const dotenv = require('dotenv');
const path = require('path');
const setupSocket = require('./socket/socket.js');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true }));

const http = require('http');
const { Server } = require("socket.io");

const port = process.env.PORT || 8080;

// Update the MongoDB connection with the new URL and options
mongoose.connect(`mongodb+srv://project:${process.env.DB_PASSWORD}@cluster0.cw3zhzn.mongodb.net/project`)  
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch(err => {
    console.error("Connection error", err.message);
  });

app.use('/', router);

// Serve the frontend (if needed)
// app.use(express.static(path.join(__dirname, 'client', 'dist')));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

const server = app.listen(port, () => {
  console.log(`Server is running on port - ${port}`);
});
setupSocket(server);
