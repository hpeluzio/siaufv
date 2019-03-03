'use strict'

class InstitutoUpdate {
  get rules () {

    const id = this.ctx.params.id

    return {
      instituto: 'required|unique:institutos,instituto,id,'+ id,
    }
  }

  get messages() {
    return {
      'required': 'O campo {{ field }} é obrigatório.',
      'unique': 'O campo {{ field }} já está cadastrado(a).'
    }
  }

  async fails(error) {
    console.log(error)
    return this.ctx.response.status(400).json( { "error" : error })
  }
}

module.exports = InstitutoUpdate
