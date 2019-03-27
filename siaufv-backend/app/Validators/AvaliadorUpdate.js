'use strict'

class AvaliadorUpdate {
  get rules () {
    //const matriculaAvaliador = this.ctx.params.id
    const idAvaliador = this.ctx.params.id

    return {
      //matricula: 'required|unique:avaliadores,matricula, id,'+ matriculaAvaliador,
      nome: 'required|unique:avaliadores,nome, id,'+ idAvaliador,
      curso: 'required',
      instituto: 'required',
      email: 'required|email|unique:avaliadores,email, id,'+ idAvaliador,
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'email': 'Digite um e-mail válido.',
      'unique': 'O campo {{ field }} já está cadastrado(a).'
    }
  }

  async authorize () {

    if (this.ctx.auth.user.permission !== 'admin') {
      this.ctx.response.unauthorized('Not authorized')
      return false
    }

    return true
  }  

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( { "error" : error })
  }
}

module.exports = AvaliadorUpdate
