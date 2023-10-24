const User = require("../models/user");

// su dung asyn - await cho cac ham nao call DB
const getUsersAPI = async (req, res) => {
    let results = await User.find({});

    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const postCreateUserAPI = async (req, res) => {
    // nay la noi chuoi trong JS, ko can dung dau "+", chi can dung dau ","
    console.log("req.body: ", req.body);
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;

    // await User.create({
    //     email: email,
    //     name: name,
    //     city: city
    // })

    let user = await User.create({
        email,
        name,
        city
    })

    // let { email, myname, city } = req.body;
    // connection.query(
    //     // Dung dau '' thi khi xuong dong se bao loi cau, dung dau `` thi ko bi vay
    //     `INSERT INTO Users (email, name, city) 
    //     VALUES (?, ?, ?)`,
    //     [email, myname, city],
    //     function (err, results) {
    //         res.send(' Created user succeed !')
    //     }
    // );

    // let [results, fields] = await connection.query(
    //     `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [email, name, city]
    // );

    // console.log("results: ", results);

    return res.status(200).json({
        errorCode: 0,
        data: user
    })

    // connection.query(
    //     'select * from Users u', 
    //     function (err, results, fields) {
    //         console.log("results", results);
    //     }
    // )

    // const [results, fields] = await connection.query('select * from Users u');
    // console.log("results", results);
    // res.send('create a new user');
}

const putUpdateUserAPI = async (req, res) => {
    // let { userID, email, myname, city } = req.body;
    let userID = req.body.userID;
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    let user = await User.updateOne({ _id: userID }, { name: name, email: email, city: city });
    // await User.updateOne(name, email, city);

    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}

const deleteUserAPI = async (req, res) => {
    const userID = req.body.userID;
    // await deleteUserByID(userID);
    // đối với Mongoose, có thể hứng kết quả trả ra với từng câu lệnh
    let results = await User.deleteOne({
        _id: userID
    })
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI
}