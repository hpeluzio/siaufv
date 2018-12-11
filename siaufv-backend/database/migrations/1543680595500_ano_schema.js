'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnoSchema extends Schema {
  up () {
    this.create('anos', (table) => {
      table.increments()
      table.integer('ano').unsigned().notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('anos')
  }
}

module.exports = AnoSchema
