const path = require("path");
const express = require('express');

const configViewEngine = (app) => {
    console.log(">>> check __dirname", __dirname);
    app.set("views", path.join('./src', 'views'));
    app.set("view engine", "ejs");
    // config static file 
    // app.use(express.static('public'));
    // app.use('/static', express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join('./src', 'public')));
}

module.exports = configViewEngine;  // configViewEngine() -> sai, vì nó sẽ hiểu là tới dòng này sẽ thực thi hàm configViewEngine()