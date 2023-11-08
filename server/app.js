const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./model/User')
const router = require('./routes/router');
const dotenv = require('dotenv');
const path = require('path')
const setupSocket = require('./socket/socket.js')

const app = express();//to create an instance of the Express application object.
dotenv.config() 
 
app.use(express.json())//`express.json()` is middleware provided by the Express framework for parsing incoming JSON data,  It is used to automatically parse incoming JSON payloads and make the resulting data available in the `request.body` object.
app.use(express.urlencoded({ extended: true }));///middleware provided by the Express framework for parsing incoming HTTP requests with URL-encoded payloads. This middleware is used to automatically parse incoming URL-encoded payloads and make the resulting data available in the `request.body` object


app.use(cors({ credentials: true }));
// app.use(cors({ origin: origin, credentials: true }));//provided by the `cors` package for enabling Cross-Origin Resource Sharing (CORS) in an Express app, CORS is a mechanism that allows a web page to make requests to a different domain 


const http = require('http');
const { Server } = require("socket.io");
// const server = http.createServer(app);

const port = process.env.PORT || 8080; 
 

mongoose.connect(`mongodb+srv://project:${process.env.DB_PASSWORD}@cluster0.cw3zhzn.mongodb.net/?retryWrites=true&w=majority`, {
// mongoose.connect(`mongodb+srv://project:${process.env.DB_PASSWORD}@cluster0.cw3zhzn.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,//handle deprecation warnings from the MongoDB driver's default parser. It also provides better support for advanced connection string features like the `srv` protocol, which enables clients to discover MongoDB server instances via DNS records.
    useUnifiedTopology: true//new server discovery and monitoring engine .
})  
    .then(() => {  
        console.log("Successfully connect to MongoDB");
    })
    .catch(err => {
        console.error("Connection error", err.message);
    }); 

 
app.use('/', router);

// Servinlkkkkke;g the frontent
// app.use(express.static(path.join(__dirname, 'client', 'dist')))
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))

// })

const server =  app.listen(port, () => {
    console.log(`Server is running on port - ${port}`);
})
setupSocket(server);