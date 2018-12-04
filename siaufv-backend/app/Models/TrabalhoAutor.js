'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TrabalhoAutor extends Model {

    trabalho () {
        return this.hasOne('App/Models/Trabalho')
    }

}

module.exports = TrabalhoAutor
