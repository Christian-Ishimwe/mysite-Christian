const express = require("express")
const router= express.Router()
const {getProjects, userSingleProject} = require("../controllers/projectsController")
router.get("/",  getProjects)
router.get("/:id", userSingleProject)

module.exports=router