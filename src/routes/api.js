const express = require('express');
const routerAPI = express.Router();
const { getUsersAPI } = require("../controllers/apiController")

// quy chuan su dung:         router.Method('/router', handler);
// neu sua doi giao dien, thi bat dau check trong phan routes nay 
routerAPI.get("/", (req, res) => {
    res.send("Hello APIs")
});

routerAPI.get("/abc", (req, res) => {
    res.status(200).json({
        data: "Hello API2 abc"
    })
});

routerAPI.get("/users", getUsersAPI);

module.exports = routerAPI;  // export default

