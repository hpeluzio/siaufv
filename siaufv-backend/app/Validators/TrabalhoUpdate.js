'use strict'

class TrabalhoUpdate {
  get rules () {

    const trabalhoId = this.ctx.params.id
    
    return {
      //id: 'required|unique:trabalhos,id, id,'+ trabalhoId,
      trabalho_id: 'required|unique:trabalhos,trabalho_id, trabalho_id,'+ trabalhoId,
      nome: 'required',
      autor: 'required',
      orientador: 'required',
      modalidade: 'required',
      area: 'required',
      ano: 'required'
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
    return this.ctx.response.status(400).json( error )
  }
}

module.exports = TrabalhoUpdate
