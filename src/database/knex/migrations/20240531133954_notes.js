
exports.up = knex => knex.schema.createTable("users", (table)=>{
    table.increments('id')
    table.text('name')
    table.text('note')
    table.integer('id_user').references('id').inTable('user').onDelete('CASCATE')
})

exports.down = knex => knex.schema.dropTable("users")
