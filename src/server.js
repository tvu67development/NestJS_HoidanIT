require('dotenv').config();
const express = require("express"); // common JS
//import express from "express"; // ES modules
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const connection = require('./config/database');

const app = express(); // app express
const port = process.env.PORT || 8888; // port
const hostname = process.env.HOST_NAME;

// config request body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// config template engine
configViewEngine(app);

// khai bao route
app.use('/', webRoutes);



// Anonymous Function
(async () => {
  // test connection 
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Nestjs app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connection to DB: ", error);
  }
})()


