const Customer = require("../models/customer");
const aqp = require('api-query-params');

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

    getAllCustomerService: async (limit, page, name, queryString) => {
        try {
            let result = null
            if (limit && page) {
                let offset = (page - 1) * limit

                const { filter, skip } = aqp(queryString);
                delete filter.page
                console.log(">>> filter ", filter)
                // if (name) {
                //     result = await Customer.find({
                //         "name": { $regex: '.*' + name + '.*' }
                //     }).skip(offset).limit(limit).exec()
                // } else 
                // exec() đảm bảo đống code chạy đúng với một promise, đảm bảo async await
                result = await Customer.find(filter).skip(offset).limit(limit).exec()
            } else {
                result = await Customer.find({});
            }
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
    },

    deleteArrayCustomerService: async (arrCustomer) => {
        try {
            let result = await Customer.delete({ _id: { $in: arrCustomer } })
            return result;
        } catch (error) {
            console.log(error)
            return null
        }
    }
}