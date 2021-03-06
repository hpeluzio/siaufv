'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Avaliador extends Model {

    // Tabela avaliadores
    static get table () {
        return 'avaliadores'
    }
    
    //Relaçao com Ano
    ano () {
        return this.hasOne('App/Models/Ano')
    }

    //Relaçao com Avaliacao
    avaliacao () {
        return this
          .belongsToMany('App/Models/Avaliacao')
          .pivotTable('avaliador_avaliacao')
    }

}

module.exports = Avaliador
