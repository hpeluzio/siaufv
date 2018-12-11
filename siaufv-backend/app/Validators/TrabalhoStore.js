'use strict'

class TrabalhoStore {
  get rules () {
    return {
      trabalho_id: 'required|unique:trabalhos,trabalho_id',
      nome: 'required',
      orientador: 'required',
      modalidade: 'required',
      area: 'required',
      ano_id: 'required'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'unique': 'O campo {{ field }} já está cadastrado(a).'
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( error )
  }
}

module.exports = TrabalhoStore
