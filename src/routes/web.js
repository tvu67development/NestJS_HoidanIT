const express = require('express');
const { getHomepage, getABC, getHoiDanIT, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser, postHandleRemoveUser } = require('../controllers/homeController');
const router = express.Router();

// quy chuan su dung:         router.Method('/router', handler);
// neu sua doi giao dien, thi bat dau check trong phan routes nay 
router.get("/", getHomepage);

router.get("/abc", getABC);

router.get("/hoidanit", getHoiDanIT);

router.get("/create", getCreatePage);

router.get("/update/:id", getUpdatePage);  // dau : de truyen dong tham so 

router.post("/create-user", postCreateUser);

router.post("/update-user", postUpdateUser);

router.post("/delete-user/:id", postDeleteUser);

router.post("/delete-user", postHandleRemoveUser);

module.exports = router;  // export default

