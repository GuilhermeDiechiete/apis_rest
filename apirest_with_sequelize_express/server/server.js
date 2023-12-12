const express = require("express")
const server = express()
require("dotenv").config()
const db = require("./database/connection")
const userRoutes = require("./routes/userRoutes")
const bodyParser = require("body-parser")

server.use(bodyParser.json())

server.use("/users", userRoutes)

server.listen(5000, () => console.log("server running"))