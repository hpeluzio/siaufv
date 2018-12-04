'use strict'

class AvaliadorUpdate {
  get rules () {
    const avaliadorsId = this.ctx.params.id
    const matriculaAvaliador = this.ctx.params.id
    const nomeAvaliador = this.ctx.params.id
    console.log(avaliadorsId)

    return {
      //matricula: 'required|unique:avaliadors,matricula, id,'+ matriculaAvaliador,
      nome: 'required|unique:avaliadors,nome, id,'+ nomeAvaliador,
      curso: 'required',
      instituto: 'required',
      email: 'required|email|unique:avaliadors,email, id,'+ avaliadorsId,
      ano: 'required'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'email': 'Digite um e-mail válido.',
      'unique': 'O campo {{ field }} já está cadastrado(a).'
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( { "error" : error })
  }
}

module.exports = AvaliadorUpdate
