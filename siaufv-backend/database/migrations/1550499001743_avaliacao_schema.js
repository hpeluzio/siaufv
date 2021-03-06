'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvaliacaoSchema extends Schema {
  up() {
    this.create('avaliacoes', table => {
      table.increments()
      // table.date('data').notNullable()
      // table.time('horario').notNullable()
      // table.integer('tipo').notNullable()
      // table.string('instituto').notNullable()
      // table.integer('sala_id').notNullable().unsigned()
      table.integer('sessao_id').notNullable().unsigned()
      table.integer('trabalho_id').notNullable().unique()
      table.timestamps()
      table
        .foreign('sessao_id')
        .references('id')
        .inTable('sessoes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .foreign('trabalho_id')
        .references('trabalho_id')
        .inTable('trabalhos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    
    })
  }

  down() {
    this.drop('avaliacoes')
  }
}

module.exports = AvaliacaoSchema
