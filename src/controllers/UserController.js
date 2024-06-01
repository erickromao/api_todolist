const AppError = require('../utils/AppError')
const knex = require('../database/knex')
const jwt = require('jsonwebtoken')
const { hash, compare } = require('bcryptjs')

class UserController {

    async create(request, response) {
        const { name, email, password } = request.body

        const [checkEmail] = await knex('users').where({ email })
        if (checkEmail) {
            throw new AppError('Email já existente.')
        }

        const hashedPassword = await hash(password, 8)

        await knex('users').insert({
            name,
            email,
            password: hashedPassword
        })

        return response.status(201).json({
            message: "Conta criada com sucesso!",
            name,
            email,
            password
        })
    }
    async login(request, response) {
        const KEY = '123'
        const { email, password } = request.body

        if(!email || !password){
            throw new AppError('Preencha os campos de "email" e "password".')
        }

        const [user] = await knex('users').where({ email })
        if (!user) {
            throw new AppError('Usuário não encontrado!')
        }

        const checkPassowrd = await compare(password, user.password)
        if(!checkPassowrd){
            throw new AppError('Senha incorreta!')
        }

        const token = jwt.sign({id:user.id}, KEY,{expiresIn: "1m"} )

        return response.json({
            message:"Login Feito com sucesso!",
            token:token
        })

    }
    async delete(request, response){
        const userId = request.user.id

        try{
            await knex("users").where({id:userId}).delete()
        }catch(err){
            console.error(err)
            throw new AppError("Ocorreu um erro")
        }
        
        response.send("Usuário deletado com sucesso!")
       
    }
    
}

module.exports = UserController