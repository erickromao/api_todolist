
exports.up = knex => knex.schema.createTable("notes", (table)=>{
    table.increments('id')
    table.text('name')
    table.text('note')
    table.integer('id_user').references('id').inTable('users').onDelete('CASCADE')
})

exports.down = knex => knex.schema.dropTable("notes")
