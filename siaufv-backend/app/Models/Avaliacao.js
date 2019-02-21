'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Avaliacao extends Model {
  // Tabela avaliacoes
  static get table() {
    return 'avaliacoes'
  }

  // Relacao com Avaliador
  avaliador() {
    return this
        .belongsToMany('App/Models/Avaliador')
        .pivotTable('avaliador_avaliacao')
  }
}

module.exports = Avaliacao
