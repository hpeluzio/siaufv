'use strict'

class InstitutoStore {
  get rules () {
    return {
      instituto: 'required|unique:institutos'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'unique': 'O campo {{ field }} já está cadastrado(a).',
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

module.exports = InstitutoStore
