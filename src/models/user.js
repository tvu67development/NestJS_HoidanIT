const mongoose = require("mongoose");

// shape data, Schema quy dinh kieu du lieu cua table
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
})

const User = mongoose.model("user", userSchema);
module.exports = User;
