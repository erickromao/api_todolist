const { Router } = require('express')
const NotesController = require('../controllers/NotesController')
const token = require('../middlewares/token')
const notesRouter = Router()

const notesController = new NotesController()

notesRouter.post("/", token, notesController.create)
notesRouter.get("/show", token, notesController.show)
notesRouter.get("/",token, notesController.read)
notesRouter.put("/", token, notesController.update)
notesRouter.delete("/",token, notesController.delete)


module.exports = notesRouter