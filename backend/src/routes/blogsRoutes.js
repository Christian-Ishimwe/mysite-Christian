const express = require("express")
const router= express.Router()
const {authenticateToken} = require("../auth/jwebUser")
const {getBlogs, getOneBlog,commentBlog} = require("../controllers/blogsControllers")
router.get("/", getBlogs)
router.post("/:id",authenticateToken, commentBlog)
router.get("/:id",getOneBlog)

module.exports=router