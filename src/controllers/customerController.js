const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");
const { createCustomerService, createArrayCustomerService, getAllCustomerService, putUpdateCustomerService, deleteACustomerService, deleteArrayCustomerService } = require("../services/customerService");

// {key : value}
module.exports = {
    postCreateCustomer: async (req, res) => {

        // destructing object js
        let { name, address, phone, email, description } = req.body
        // console.log(">>> check name: ", name)
        let imageURL = ""

        if (!req.files || Object.keys(req.files).length === 0) {
            // do nothing
        } else {
            // hứng kết quả trả về của hàm, hàm nào có return trả về đều có thể hứng được
            let result = await uploadSingleFile(req.files.image);
            imageURL = result.path
            console.log(">>> check result: ", result)
        }

        // name: {
        //     type: String,
        //     require: true
        // },
        // address: String,
        // phone: String,
        // email: String,
        // image: String,
        // description: String
        let customerData = { name, address, phone, email, description, image: imageURL }
        let customer = await createCustomerService(customerData)
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },

    postCreateArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers)
        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: null
            })
        }
    },

    getAllCustomers: async (req, res) => {
        let customers = await getAllCustomerService()
        return res.status(200).json({
            EC: 0,
            data: customers
        })
    },

    putUpdateCustomer: async (req, res) => {
        let { id, name, email, address } = req.body
        let customer = await putUpdateCustomerService(id, name, email, address)
        if (customer) {
            return res.status(200).json({
                EC: 0,
                data: customer
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: null
            })
        }
    },

    deleteACustomer: async (req, res) => {
        let id = req.body.id
        // console.log(id)
        let customer = await deleteACustomerService(id)
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },

    deleteArrayCustomer: async (req, res) => {
        console.log(req.body.customersID)
        let customer = await deleteArrayCustomerService(req.body.customersID)
        return res.status(200).json({
            EC: 0,
            data: customer
        })
    }
}