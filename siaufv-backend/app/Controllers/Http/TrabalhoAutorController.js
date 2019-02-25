'use strict'

const Database = use('Database')
/**
 * Resourceful controller for interacting with trabalhoautors
 */
class TrabalhoAutorController {

  async index ({ request, response, view }) {
    return await Database
      .select('*')
      .table('trabalho_autores')
  }

  async store ({ request, response }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TrabalhoAutorController
