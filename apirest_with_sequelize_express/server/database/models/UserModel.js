const Sequelize = require("sequelize")
const connection = require("../connection")

const User = connection.define(
    "user", {
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
    }
)
//User.sync({force: true})

module.exports = User