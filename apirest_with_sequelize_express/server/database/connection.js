const Sequelize = require("sequelize")

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {  
    host: process.env.HOST, 
    dialect: "mysql",
    timezone: "-03:00"
})

connection.authenticate()
    .then(()=> console.log("Connect Database"))
    .catch((error) => console.log(error))

 



module.exports = connection