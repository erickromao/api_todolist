const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class NotesController{
    async create(request, response){
        const userId = request.user.id
        const {title, note, checked} = request.body

        if(!title || !note){
            throw new AppError('Preencha os campos de "title" e "note".')
        }

        const [checkNoteTitle] = await knex("notes").where({title}).where({id_user:userId})
        if(checkNoteTitle){
            throw new AppError("Nome de nota já utilizado!")
        }

        const [user] = await knex("users").where({id:userId})

        await knex("notes").insert({
            title,
            note,
            id_user:userId,
            checked

        })
        response.json({
            message:`Nota criada com sucesso ${user.name}`,
            title,
            note,
            checked
        })
        
    }

    async update(request, response){
        const userId = request.user.id
        const {title, new_title,  note, checked} = request.body

        if(!title){
            throw new AppError('O título é obrigatório!')
        }

        const checkTitleExists = await knex('notes').where({id_user:userId})
        if(checkTitleExists.length <=0){
            throw new AppError('Usuário não possui notas cadastradas.')
        }

        const [checkNote] = await knex('notes').where({title}).where({id_user:userId})
        if(!checkNote){
            throw new AppError('Essa nota não existe.')
        }
        
        const oldNote = [checkNote.title, checkNote.note]

        for(let i=0; i<checkTitleExists.length ; i++){
            if(checkTitleExists[i].title == new_title){
                throw new AppError('Esse título já está em uso.')
            }
        }
        
        checkNote.title = new_title ?? checkNote.title
        checkNote.note = note ?? checkNote.note
        checkNote.checked = checked ?? checkNote.checked
        
        const time = new Date()
        const currentTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        const currentDate = `${time.getDay()}:${time.getMonth()}:${time.getFullYear()}`

        await knex('notes')
        .update({
            title:checkNote.title,
            note: checkNote.note,
            checked: checkNote.checked,
            updated_at: knex.raw('now()')
        })
        .where({id:checkNote.id})
        
        return response.json({
            message:'Nota atualizada com sucesso!',
            Old_Note:oldNote,
            New_Note:[checkNote.title, checkNote.note],
            checked: checkNote.checked,
            updated_at:{
                time: currentTime,
                date: currentDate
            }
            
        })
    }

    async show(request, response){
        const userId = request.user.id
        const {title} = request.body

        if(!title){
            throw new AppError('Preencha o campo (title)')
        }

        const [user] = await knex("users").where({id:userId})
        const [checkNoteTitle] = await knex("notes")
        .select('title','note', 'checked', 'created_at', 'updated_at')
        .where({title})
        .where({id_user:userId})
        if(!checkNoteTitle){
            throw new AppError('Nota não encontrada.')
        }

        return response.json({
            user:user.name,
            note:checkNoteTitle
        })
    }

    async read(request, response){
        const userId = request.user.id
        
        const [user] = await knex("users").where({id:userId})

        const notes = await knex("notes")
        .select('title','note','checked','updated_at', 'created_at')
        .where({id_user:userId})
        .orderBy('title')
       
        if(!notes){
            throw new AppError(`Nenhuma nota criada no usuário (${user.name})`)
        }

        return response.json({
            user:user.name,
            notes:notes
        })

    }

    async delete(request, response){
        const userId = request.user.id
        const {title} = request.body

        if(!title){
            throw new AppError('Preencha o campo de (title)')
        }

        const [user] = await knex('users').where({id:userId})

        const [checkNoteId] = await knex("notes").where({title}).where({id_user:userId})
        console.log(checkNoteId)
        if(!checkNoteId){
            throw new AppError(`Nota não encontrada no usuário (${user.name})`)
        }  
        const noteInfo = checkNoteId
        await knex("notes").where({title}).where({id_user:userId}).delete()

        response.json({
            message:`Nota (${title}) do usuário (${user.name}) apagada com sucesso!`,
            note:`Informações da nota apagada: [ ${noteInfo.note} ]`
        })
        
    }
    
}

module.exports = NotesController