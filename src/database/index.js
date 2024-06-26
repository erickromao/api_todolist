const {Pool} = require('pg')

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'123',
    port:5432
})

const nameDb = 'todolistdb'

async function createDB(){
    try{
        const client = await pool.connect()
        const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${nameDb}'`)

        if(result.rows.length === 0){
            await client.query(`CREATE DATABASE ${nameDb}`)
            console.log(`Banco de dados '${nameDb}' criado com sucesso!`)
    }else{
        console.log(`Banco '${nameDb}' já existente`)
    }
    }catch(err){
        console.error('Houve um error na criaçao do banco!',err)
    }finally{
        pool.end()
    }

}

module.exports = createDB