'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AvaliadorAvaliacao extends Model {
  // Tabela AvaliadorAvaliacao
  static get table() {
    return 'avaliador_avaliacao'
  }
}

module.exports = AvaliadorAvaliacao
