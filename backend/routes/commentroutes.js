const express = require("express");
const router = express.Router()

const commentcontroller = require ("../controller/commentcontroller")

router.get("/", commentcontroller.getAllcomment)
router.get("/post/:post_id", commentcontroller.getCommentByPostId)
router.post("/", commentcontroller.createcomment)
router.put("/:id/update", commentcontroller.updatecomment)


router.route("/:id")
.delete(commentcontroller.deletecomment)

module.exports = router;