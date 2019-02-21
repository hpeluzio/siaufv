'use strict'

class AvaliacaoStore {
  get rules() {
    return {
      data: 'required',
      horario: 'required',
      tipo: 'required',
      trabalho_id: 'required',
      sala_id: 'required',
      avaliadores_nome: 'required',
      instituto: 'required'
    }
  }

  get messages() {
    return {
      required: 'O campo {{ field }} é obrigatório.',
      unique: 'O campo {{ field }} já está cadastrado(a).'
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json(error)
  }
}

module.exports = AvaliacaoStore
