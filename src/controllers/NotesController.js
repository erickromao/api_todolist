const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class NotesController{
    async create(request, response){
        const userId = request.user.id
        const {name, note} = request.body

        if(!name || !note){
            throw new AppError('Preencha os campos de "name" e "note".')
        }

        const [checkNameNote] = await knex("notes").where({name}).where({id_user:userId})
        if(checkNameNote){
            throw new AppError("Nome de nota já utilizado!")
        }

        const [user] = await knex("users").where({id:userId})

        await knex("notes").insert({
            name,
            note,
            id_user:userId
        })
        response.json({
            message:`Nota criada com sucesso ${user.name}`,
            name,
            note
        })
        
    }
    async delete(request, response){
        const userId = request.user.id
        const {name} = request.body

        if(!name){
            throw new AppError('Preencha o campo de (name)')
        }

        const [user] = await knex('users').where({id:userId})

        const [checkNoteId] = await knex("notes").where({name}).where({id_user:userId})
        console.log(checkNoteId)
        if(!checkNoteId){
            throw new AppError(`Nota não encontrada no usuário (${user.name})`)
        }  
        const noteInfo = checkNoteId
        await knex("notes").where({name}).where({id_user:userId}).delete()

        response.json({
            message:`Nota (${name}) do usuário (${user.name}) apagada com sucesso!`,
            note:`Informações da nota apagada: [ ${noteInfo.note} ]`
        })
        
    }
    
}

module.exports = NotesController