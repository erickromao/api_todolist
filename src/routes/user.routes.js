const { Router } = require('express')
const UserController = require('../controllers/UserController')
const token = require('../middlewares/token')
const routerUser = Router()

const userController = new UserController()

routerUser.post("/", userController.create)
routerUser.post("/login", userController.login)
routerUser.delete("/", token, userController.delete)


module.exports = routerUser