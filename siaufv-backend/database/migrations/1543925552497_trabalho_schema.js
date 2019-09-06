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
      table.string('instituto').notNullable()
      table.integer('tipo').notNullable()
      table.integer('ano_id').unsigned().notNullable()
      table.foreign('ano_id').references('anos.id').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('trabalhos')
  }
}

module.exports = TrabalhoSchema
