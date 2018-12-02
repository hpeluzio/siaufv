'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserIsAdminSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.bool('isAdmin');
    })
  }

  down () {
    this.alter('users', (table) => {
      table.dropColumn('isAdmin')
    })
  }
}

module.exports = UserIsAdminSchema
