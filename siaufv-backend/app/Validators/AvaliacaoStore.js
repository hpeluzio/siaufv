'use strict'

class AvaliacaoStore {
  get rules() {
    return {
      sessao_id: 'required',
      trabalho_id: 'required|unique:avaliacoes,trabalho_id',
      avaliador1_id: 'required',
      avaliador2_id: 'required',
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
