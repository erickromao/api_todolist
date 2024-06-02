
exports.up = knex => knex.schema.createTable("notes", (table)=>{
    table.increments('id')
    table.text('title')
    table.text('note')
    table.boolean('checked').defaultTo(false)
    table.integer('id_user').references('id').inTable('users').onDelete('CASCADE')

    table.timestamp('updated_at').default(knex.fn.now())
    table.timestamp('created_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("notes")
