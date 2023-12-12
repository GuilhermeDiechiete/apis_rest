const router = require("express").Router()
const UserController = require("../controllers/UserController")

const token = require("../fragments/security/config-token")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.delete("/delete/:id", token.verifyToken, UserController.delete)
router.get("/list", UserController.list)
module.exports = router