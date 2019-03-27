'use strict'

class SessaoUpdate {
  get rules () {
    return {
      nome: 'required',
      //data: 'required',
      //horario: 'required',
      //horariofim: 'required',
      //tipo: 'required',
      instituto: 'required',
      ano_id: 'required',
      //sala_id: 'required',
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

module.exports = SessaoUpdate
