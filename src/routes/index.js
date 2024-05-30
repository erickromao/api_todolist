const {Router} = require('express')
const routerUser = require('./user.routes')
const router = Router()

router.use("/user", routerUser)

module.exports = router