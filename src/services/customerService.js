const Customer = require("../models/customer");

module.exports = {
    createCustomerService: async (customerData) => {
        console.log(">>> check: ", customerData)
        try {
            let result = await Customer.create({
                name: customerData.name,
                address: customerData.address,
                phone: customerData.phone,
                email: customerData.email,
                description: customerData.description,
                image: customerData.image
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },

    createArrayCustomerService: async (arr) => {
        try {
            let result = await Customer.insertMany(arr);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    getAllCustomerService: async () => {
        try {
            let result = await Customer.find({});
            return result;
        } catch (error) {
            console.log(error);
            return null
        }
    },

    putUpdateCustomerService: async (id, name, email, address) => {
        try {
            let result = await Customer.updateOne({ _id: id }, { name, email, address })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },

    deleteACustomerService: async (id) => {
        try {
            let result = await Customer.deleteById({ _id: id })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}