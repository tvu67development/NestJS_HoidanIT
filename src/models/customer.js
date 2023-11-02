const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

// shape data, Schema quy dinh kieu du lieu cua table
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true   // nhớ viết cho đúng "required" (thay vì "require")
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String
},
    {
        timestamps: true, // createdAt, updatedAt
        // statics: {
        // thêm phương thức khi gọi tới Schema "customerSchema"
        //     findByHoiDanIT(name) {
        //         return this.find({ name: new RegExp(name, 'i') });
        //     }
        // }
    }
)

// soft delete
customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
