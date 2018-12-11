'use strict'

class AvaliadorUpdate {
  get rules () {
    //const matriculaAvaliador = this.ctx.params.id
    const idAvaliador = this.ctx.params.id

    return {
      //matricula: 'required|unique:avaliadors,matricula, id,'+ matriculaAvaliador,
      nome: 'required|unique:avaliadors,nome, id,'+ idAvaliador,
      curso: 'required',
      instituto: 'required',
      email: 'required|email|unique:avaliadors,email, id,'+ idAvaliador,
      ano_id: 'required'
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
