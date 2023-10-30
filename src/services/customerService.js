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
    }
}