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

        if (!email || !password) {
            throw new AppError('Preencha os campos de "email" e "password".')
        }

        const [user] = await knex('users').where({ email })
        if (!user) {
            throw new AppError('Usuário não encontrado!')
        }

        const checkPassowrd = await compare(password, user.password)
        if (!checkPassowrd) {
            throw new AppError('Senha incorreta!')
        }

        const token = jwt.sign({ id: user.id }, KEY, { expiresIn: "1m" })

        return response.json({
            message: "Login Feito com sucesso!",
            token: token
        })

    }
    async delete(request, response) {
        const userId = request.user.id

        try {
            await knex("users").where({ id: userId }).delete()
        } catch (err) {
            console.error(err)
            throw new AppError("Ocorreu um erro")
        }

        response.send("Usuário deletado com sucesso!")

    }
    async read(request, response) {
        const userId = request.user.id

        const [user] = await knex('users').select('name', 'email').where({ id: userId })
        return response.json({
            message: "Dados do usuário:",
            name: user.name,
            email: user.email
        })
    }
    async update(request, response) {
        const userId = request.user.id
        const { name, email, new_password, old_password } = request.body

        const [user] = await knex('users').where({ id: userId })
        let hashedPassword

        if (new_password && !old_password) {
            throw new AppError('Para atualizar a senha é necessária colocar a senha ainda.')
        }
        if (new_password && old_password) {
           
            const checkPassword = await compare(old_password, user.password)
            
            if (!checkPassword) {
                throw new AppError('Senha incorreta!')
            }
            hashedPassword = await hash(new_password, 8)
        }
       
        if(email){
            const [checkUserEmail] = await knex('users').where({email})
            
            if (checkUserEmail && checkUserEmail.id != user.id) {
                throw new AppError('Email já existente.')
            }
        }
        
        user.name = name ?? user.name
        user.email = email ?? user.email
        user.password = hashedPassword ?? user.password

        await knex("users")
            .update({
                name: user.name,
                email: user.email,
                password: user.password
            })
            .where({ id: userId })

        if (hashedPassword) {
            return response.json({
                message: "Dados atualizados com sucesso!",
                name: user.name,
                email: user.email,
                password: new_password
            })
        }

        return response.json({
            message: "Dados atualizados com sucesso!",
            name: user.name,
            email: user.email,
        })

    }
}

module.exports = UserController