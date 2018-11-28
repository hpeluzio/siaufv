'use strict'

class UserRegister {
  get rules () {
    return {
      'username': 'required|unique:users',
      'email': 'required|email|unique:users',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'unique': 'O campo {{ field }} já existe.',
      'email': 'Digite um e-mail válido.'
    }
  }

  async fails(error) {
    return this.ctx.response.json( { "error" : error })
  }
}

module.exports = UserRegister
