const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileService");
const { createCustomerService } = require("../services/customerService");

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
    }
}