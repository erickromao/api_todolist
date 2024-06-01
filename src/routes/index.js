const {Router} = require('express')
const routerUser = require('./user.routes')
const routerNote = require('./notes.routes')
const router = Router()

router.use("/user", routerUser)
router.use("/note", routerNote)

module.exports = router