require('express-async-errors')
const AppError = require('./utils/AppError')
const createDB = require('./database')

const express = require('express')
const router = require('./routes')

require('dotenv').config()

createDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(router)

app.use((error,request, response, next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            message:error.message
        })
    }
    console.log(error)
    return response.status(500).send("Error Internal Server")
})

app.listen(PORT, ()=>{console.log(`ServerON [ ${PORT} ]`)})