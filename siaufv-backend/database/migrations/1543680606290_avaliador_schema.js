'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvaliadorSchema extends Schema {
  up () {
    this.create('avaliadors', (table) => {
      table.increments()
      table.string('matricula').notNullable()
      table.string('nome').notNullable().unique()
      table.string('curso').notNullable()
      table.string('instituto').notNullable()
      table.string('email').notNullable().unique()
      //table.integer('ano_id').references('id').inTable('anos').onDelete('CASCADE').notNullable()
      table.integer('ano').unsigned().notNullable()
      table.foreign('ano').references('anos.ano').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('avaliadors')
  }
}

module.exports = AvaliadorSchema
