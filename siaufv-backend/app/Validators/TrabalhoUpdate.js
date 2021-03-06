'use strict'

class TrabalhoUpdate {
  get rules () {

    const id = this.ctx.params.id

    return {
      trabalho_id: 'required|unique:trabalhos,trabalho_id, id,'+ id,
      nome: 'required',
      orientador: 'required',
      modalidade: 'required',
      area: 'required',
      ano_id: 'required',
      instituto: 'required',
      tipo: 'required'
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
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
    return this.ctx.response.status(400).json( error )
  }
}

module.exports = TrabalhoUpdate
