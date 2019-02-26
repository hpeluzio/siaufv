'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sessao extends Model {

    static get table () {
        return 'sessoes'
    }
}

module.exports = Sessao
