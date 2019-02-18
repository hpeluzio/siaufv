'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvaliacaoSchema extends Schema {
  up() {
    this.create('avaliacoes', table => {
      table.increments()
      table.date('data').notNullable()
      table.time('horario', 4).notNullable()
      table.integer('tipo').notNullable()
      table.integer('sala_id').notNullable().unsigned()
      table.integer('avaliador_id').notNullable().unsigned()
      table.integer('ano_id').notNullable().unsigned()
      table.integer('trabalho_id').notNullable()
      table.timestamps()
      table
        .foreign('sala_id')
        .references('id')
        .inTable('salas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .foreign('trabalho_id')
        .references('trabalho_id')
        .inTable('trabalhos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      // table
      //   .foreign('avaliador_id')
      //   .references('id')
      //   .inTable('avaliadores')
      //   .onUpdate('CASCADE')
      //   .onDelete('CASCADE')
      // table
      //   .foreign('ano_id')
      //   .references('id')
      //   .inTable('anos')
      //   .onUpdate('CASCADE')
      //   .onDelete('CASCADE')        
    })
  }

  down() {
    this.drop('avaliacoes')
  }
}

module.exports = AvaliacaoSchema
