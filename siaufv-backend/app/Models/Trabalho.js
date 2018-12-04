'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Trabalho extends Model {

    //Relaçao com Ano
    ano () {
        return this.hasOne('App/Models/Ano')
    }
}

module.exports = Trabalho
