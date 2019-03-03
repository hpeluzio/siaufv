'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SecaoSchema extends Schema {
  up () {
    this.create('sessoes', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.date('data').notNullable()
      table.time('horario').notNullable()
      table.time('horariofim').notNullable()
      table.integer('tipo').notNullable()
      table.string('instituto').notNullable()
      table.integer('ano_id').unsigned().notNullable()
      table.integer('sala_id').notNullable().unsigned()
      table.timestamps()
      table
        .foreign('sala_id')
        .references('id')
        .inTable('salas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .foreign('ano_id')
        .references('id')
        .inTable('anos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')  
    })
  }

  down () {
    this.drop('sessoes')
  }
}

module.exports = SecaoSchema
