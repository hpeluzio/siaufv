'use strict'

class SalaUpdate {
  get rules () {
    
    const id = this.ctx.params.id
    console.log(id)

    return {
      nome: 'required|unique:salas,nome,id,'+ id,
      descricao: 'required',
      capacidade: 'required|integer',
      tipo: 'required'
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

module.exports = SalaUpdate
