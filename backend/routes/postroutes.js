const express = require("express");
const router = express.Router()
const uploadimage = require("../multer")
const path = require('path')
const postcontroller = require ('../controller/postcontroller')

router.get("/", postcontroller.getAllpost)
router.post("/", uploadimage.single('image'),postcontroller.createpost)
router.put("/:id",uploadimage.single('image'), postcontroller.updatePost)


router.route("/:id")
.get(postcontroller.getpostById)
.delete(postcontroller.deletePost)

router.use("/upload", express.static(path.join(__dirname, "../upload/")));
module.exports = router;