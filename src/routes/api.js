const express = require('express');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFilesAPI } = require("../controllers/apiController")
const { postCreateCustomer, postCreateArrayCustomer, getAllCustomers, putUpdateCustomer, deleteACustomer, deleteArrayCustomer } = require("../controllers/customerController")

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

module.exports = routerAPI;  // export default

