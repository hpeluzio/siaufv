'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrabalhoAutorSchema extends Schema {
  up () {
    this.create('trabalho_autors', (table) => {
      table.increments()
      table.integer('trabalho_id').notNullable()
      table.string('autor').notNullable()
      table.foreign('trabalho_id').references('trabalhos.trabalho_id').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('trabalho_autors')
  }
}

module.exports = TrabalhoAutorSchema
