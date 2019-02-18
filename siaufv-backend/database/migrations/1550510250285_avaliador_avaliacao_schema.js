'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvaliadorAvaliacaoSchema extends Schema {
  up () {
    this.create('avaliadores_avaliacoes', (table) => {
      //table.increments()
      table.integer('avaliador_id').notNullable().unsigned()
      table.integer('avaliacao_id').notNullable().unsigned()
      table.primary(['avaliador_id','avaliacao_id']) 
      table.timestamps()
      table
        .foreign('avaliador_id')
        .references('id')
        .inTable('avaliadores')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .foreign('avaliacao_id')
        .references('id')
        .inTable('avaliacoes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('avaliadores_avaliacoes')
  }
}

module.exports = AvaliadorAvaliacaoSchema
