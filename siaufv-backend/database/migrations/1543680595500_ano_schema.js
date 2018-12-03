'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnoSchema extends Schema {
  up () {
    this.create('anos', (table) => {
      table.integer('ano').primary().unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('anos')
  }
}

module.exports = AnoSchema
