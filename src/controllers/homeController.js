const connection = require('../config/database');
const { getAllUsers, getUserByID, updateUserByID } = require('../services/CRUDService');

// su dung asyn - await cho cac ham nao call DB
const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results });
}

const getABC = (req, res) => {
    res.send("check ABC");
}

const getHoiDanIT = (req, res) => {
    res.render('sample.ejs');
}

const postCreateUser = async (req, res) => {
    // nay la noi chuoi trong JS, ko can dung dau "+", chi can dung dau ","
    console.log("req.body: ", req.body);
    // let email = req.body.email;
    // let name = req.body.myname;
    // let city = req.body.city;

    let { email, name, city } = req.body;
    // connection.query(
    //     // Dung dau '' thi khi xuong dong se bao loi cau, dung dau `` thi ko bi vay
    //     `INSERT INTO Users (email, name, city) 
    //     VALUES (?, ?, ?)`,
    //     [email, myname, city],
    //     function (err, results) {
    //         res.send(' Created user succeed !')
    //     }
    // );

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [email, name, city]
    );

    console.log("results: ", results);

    res.send('Created user succeed !');

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

const postUpdateUser = async (req, res) => {
    // let { userID, email, myname, city } = req.body;
    let userID = req.body.userID;
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    await updateUserByID(email, name, city, userID);
    // console.log("check", { userID, name, email, city });
    // console.log("results", results)
    // res.send('Updated user succeed !');
    res.redirect("/");
}

const getCreatePage = (req, res) => {
    res.render("create.ejs")
}

const getUpdatePage = async (req, res) => {
    const userID = req.params.id;
    let user = await getUserByID(userID);
    res.render("edit.ejs", { userEdit: user }); // x <- y
}

module.exports = {
    getHomepage,
    getABC,
    getHoiDanIT,
    postCreateUser,
    postUpdateUser,
    getCreatePage,
    getUpdatePage
}