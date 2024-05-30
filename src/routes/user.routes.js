const { Router } = require('express')
const UserController = require('../controllers/UserController')
const routerUser = Router()

const userController = new UserController()

routerUser.post("/", userController.create)

module.exports = routerUser