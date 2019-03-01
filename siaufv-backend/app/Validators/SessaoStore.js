'use strict'

class SessaoStore {
  get rules () {
    return {
      nome: 'required',
      data: 'required',
      horario: 'required',
      tipo: 'required',
      instituto: 'required',
      ano_id: 'required',
      sala_id: 'required',
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( { "error" : error })
  }
}

module.exports = SessaoStore
