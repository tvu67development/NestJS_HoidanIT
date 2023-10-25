const mongoose = require("mongoose");

// shape data, Schema quy dinh kieu du lieu cua table
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String
},
    { timestamps: true }
)

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
