'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrabalhoSchema extends Schema {
  up () {
    this.create('trabalhos', (table) => {
      table.increments()
      table.integer('trabalho_id').notNullable().unique()
      table.string('nome').notNullable()
      table.string('orientador').notNullable()
      table.string('modalidade').notNullable()
      table.string('area').notNullable()
      table.integer('ano').unsigned().notNullable()
      table.foreign('ano').references('anos.ano').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('trabalhos')
  }
}

module.exports = TrabalhoSchema
