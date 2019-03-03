'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutoSchema extends Schema {
  up () {
    this.create('institutos', (table) => {
      table.increments()      
      table.string('instituto')
      table.timestamps()
    })
  }

  down () {
    this.drop('institutos')
  }
}

module.exports = InstitutoSchema
