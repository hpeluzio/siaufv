'use strict'

class AnoUpdate {
  get rules () {

    const id = this.ctx.params.id

    return {
      ano: 'required|integer|unique:anos,ano,id,'+ id,
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'integer': 'Digite um valor numérico válido.',
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

module.exports = AnoUpdate
