require('dotenv').config();
const express = require("express"); // common JS
//import express from "express"; // ES modules
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const fileUpload = require('express-fileupload'); // req.files có giá trị
const { MongoClient } = require('mongodb');

const connection = require('./config/database');

const app = express(); // app express
const port = process.env.PORT || 8888; // port
const hostname = process.env.HOST_NAME;

// config file upload
app.use(fileUpload());

// config request body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// config template engine
configViewEngine(app);

// khai bao route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);



// Anonymous Function
(async () => {
  try {

    // test connection by using mongoose - do lúc đầu mình comment dòng này lại, tức là đóng connect với mongoose nên các schema phía sau sử dụng thông qua mongoose ko được. Có thể sử dụng song song 2 kết nối mongoose vs mongodb
    await connection();

    // connection by using mongodb driver
    // Connection URL
    const url = process.env.DB_HOST_WITH_DRIVER;
    const client = new MongoClient(url);

    // Database Name
    const dbName = process.env.DB_NAME;

    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    // không phải do mặc định kết nối với collection "document" như ông Eric nói nha
    const collection = db.collection('documents');

    app.listen(port, hostname, () => {
      console.log(`Nestjs app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connection to DB: ", error);
  }
})()


