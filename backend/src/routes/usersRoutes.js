const express= require('express')
const {registerUser, loginUser, protectedRouter} = require("../controllers/usersControllers")
const router = express.Router()
const {authenticateToken} = require("../auth/jwebUser")

router.get('/', (req, res) =>{
    return res.status(200).json({
        message: "Welcome to user dashboard!"
    })
})
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/protected", authenticateToken, protectedRouter)


module.exports=router