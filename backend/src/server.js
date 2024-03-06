const express= require('express')
const app = express()
const env=require("dotenv").config() 
const userRoutes = require("./routes/usersRoutes")
const projectsRoutes = require("./routes/projectsRoutes")
const blogsRoutes = require("./routes/blogsRoutes")
const messageRoutes = require("./routes/messageRoutes")
const adminRoutes= require("./routes/adminRoutes")
const dbConnect = require("./config/dbConnector")
const {authenticateToken}= require("./auth/jwebAdmin")
app.use(express.json())
app.get("/", (req, res) =>{
    return res.status(200).json({
        message: "Welcome to my site Api"
    })
})

app.use("/auth", userRoutes)
app.use("/projects",projectsRoutes)
app.use("/blogs", blogsRoutes)
app.use("/message", messageRoutes)
app.use('/dashboard',  adminRoutes)
// , authenticateToken
const PORT=process.env.PORT || 5000
const  hostname="127.0.0.1"
app.listen(PORT, () =>{
    dbConnect()
    console.log(`The server is running on port ${PORT}`)
})
