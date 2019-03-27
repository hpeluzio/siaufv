'use strict'

class UserRegister {
  get rules () {
    return {
      'permission': 'required',
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
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

module.exports = UserRegister
