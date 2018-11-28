'use strict'

class UserLogin {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'email': 'Digite um e-mail válido.'
    }
  }

  async fails(error) {
    return this.ctx.response.json( { "error" : error })
  }
}

module.exports = UserLogin
