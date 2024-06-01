const { Router } = require('express')
const UserController = require('../controllers/UserController')
const token = require('../middlewares/token')
const routerUser = Router()

const userController = new UserController()

routerUser.post("/", userController.create)
routerUser.post("/login", userController.login)
routerUser.delete("/", token, userController.delete)
routerUser.get("/profile", token, userController.read)
routerUser.put("/", token, userController.update)

module.exports = routerUser