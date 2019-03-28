'use strict'

class UserUpdate {
  get rules () {
    return {
      'name': 'required',
      //'email': 'required|email|unique:users,email',
      'email': 'required|unique:users,email,id,'+ this.ctx.auth.user.id,
      'password': 'required|min:6',
      'confirm_password': 'required|min:6'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'unique': 'O campo {{ field }} já está cadastrado.',
      'email': 'Digite um e-mail válido.'
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( { "error" : error })
  }
}

module.exports = UserUpdate
