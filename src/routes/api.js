const express = require('express');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFilesAPI } = require("../controllers/apiController")
const { postCreateCustomer, postCreateArrayCustomer, getAllCustomers, putUpdateCustomer, deleteACustomer, deleteArrayCustomer } = require("../controllers/customerController")
const { postCreateProject, getAllProject } = require("../controllers/projectController")

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postUploadMultipleFilesAPI);

routerAPI.post("/customers", postCreateCustomer)
routerAPI.post("/customers-many", postCreateArrayCustomer)
routerAPI.get("/customers", getAllCustomers)
routerAPI.put("/customers", putUpdateCustomer)
routerAPI.delete("/customers", deleteACustomer)
routerAPI.delete("/customers-many", deleteArrayCustomer)

routerAPI.post("/projects", postCreateProject)
routerAPI.get("/projects", getAllProject)


routerAPI.get("/info", (req, res) => {
    console.log(">> check query: ", req.query)
    return res.status(200).json({
        data: req.query
    })
});

routerAPI.get("/info/:name/:address", (req, res) => {
    console.log(">> check param: ", req.params)
    return res.status(200).json({
        data: req.params
    })
});

module.exports = routerAPI;  // export default

