'use strict'

class AvaliadorUpdate {
  get rules () {
    return {
      matricula: 'required',
      nome: 'required',
      curso: 'required',
      instituto: 'required',
      email: 'required|email',
      ano: 'required'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'email': 'Digite um e-mail válido.'
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( { "error" : error })
  }
}

module.exports = AvaliadorUpdate
