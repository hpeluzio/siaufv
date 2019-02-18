'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TrabalhoAutor extends Model {

    // Tabela trabalho_autores
    static get table () {
        return 'trabalho_autores'
    }

    trabalho () {
        return this.hasOne('App/Models/Trabalho')
    }

}

module.exports = TrabalhoAutor
