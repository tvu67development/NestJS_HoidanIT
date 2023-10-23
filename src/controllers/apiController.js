const User = require("../models/user");

// su dung asyn - await cho cac ham nao call DB
const getUsersAPI = async (req, res) => {
    let results = await User.find({});

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

module.exports = {
    getUsersAPI
}