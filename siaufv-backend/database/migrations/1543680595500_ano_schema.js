'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnoSchema extends Schema {
  up () {
    this.create('anos', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('anos')
  }
}

module.exports = AnoSchema
