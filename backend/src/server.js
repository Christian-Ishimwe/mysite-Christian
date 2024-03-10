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
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc= require("swagger-jsdoc")
const {fileUrlToPath} = require("url")
const path = require("path")
app.use(express.json())


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Site - Christian",
            version: "1.0.0",
            servers: [
                {
                    url: "http://localhost:3000/auth",
                    description: "This is my site"
                }
            ]
        }
    },
    apis:[
        path.resolve( __dirname ,'routes', 'blogsRoutes.js'),
        path.resolve( __dirname ,'routes', 'usersRoutes.js'),
        path.resolve(__dirname, 'routes', 'adminRoutes.js'),
        path.resolve( __dirname ,'routes', 'messageRoutes.js'),
        path.resolve( __dirname ,'routes', 'projectsRoutes.js')
    ]
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions)

app.get("/", (req, res) =>{
    return res.status(200).json({
        message: "Welcome to my site Api"
    })
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use("/auth", userRoutes)
app.use("/projects",projectsRoutes)
app.use("/blogs", blogsRoutes)
app.use("/message", messageRoutes)
app.use('/admin',  adminRoutes)
const PORT=process.env.PORT || 5000
const  hostname="127.0.0.1"
app.listen(PORT, () =>{
    dbConnect()
    console.log(`The server is running on port ${PORT}`)
})

module.exports ={app, path}