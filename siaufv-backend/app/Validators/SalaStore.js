'use strict'

class SalaStore {
  get rules () {

    const id = this.ctx.params.id

    return {
      nome: 'required|unique:salas',
      descricao: 'required',
      capacidade: 'required|integer'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'integer': 'Digite um valor numérico válido.',
      'unique': 'O campo {{ field }} já está cadastrado(a).',
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( { "error" : error })
  }
}

module.exports = SalaStore
