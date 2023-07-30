const express = require('express');
const { getHomepage, getABC, getHoiDanIT, postCreateUser, getCreatePage, getUpdatePage } = require('../controllers/homeController');
const router = express.Router();

// quy chuan su dung:         router.Method('/router', handler);
// neu sua doi giao dien, thi bat dau check trong phan routes nay 
router.get("/", getHomepage);

router.get("/abc", getABC);

router.get("/hoidanit", getHoiDanIT);

router.get("/create", getCreatePage);

router.get("/update/:id", getUpdatePage);  // dau : de truyen dong tham so 

router.post("/create-user", postCreateUser);

module.exports = router;  // export default

