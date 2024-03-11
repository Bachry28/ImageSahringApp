const express = require("express");
const userlogincontroller = require('../controller/userlogincontroller')
const router = express.Router();
const path = require ('path')
const uploadimage = require('../multer')


router.post( "/login",userlogincontroller.createUserLogin)

router.get("/user/:id",userlogincontroller.getSpecificUser)

router.use("/upload", express.static(path.join(__dirname, "../upload/")));

module.exports = router;