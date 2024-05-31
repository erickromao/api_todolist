const AppError = require('../utils/AppError')
const knex = require('../database/knex')
const {hash} = require('bcryptjs')

class UserController{

  async create (request, response){
        const {name, email, password} = request.body

        const checkEmail = await knex('users').where({email})
        if(checkEmail){
            throw new AppError('Email já existente.')
        }

        await knex('users').insert({
            name,
            email,
            password
        })

        const hashedPassword = await hash(password, 8)

        return response.status(201).json({
            message:"Conta criada com sucesso!",
            name,
            email,
            password:hashedPassword
        })
}
}

module.exports = UserController