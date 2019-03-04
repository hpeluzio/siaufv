'use strict'

const Sala = use('App/Models/Sala')


class SalaController {

  async index ({ request, response, view }) {
    return await Sala.all()
  }

  async store ({ request, response }) {
    const { nome, descricao, capacidade, tipo } = request.only([ 'nome', 'descricao', 'capacidade', 'tipo' ]);

    try {
      await Sala.create({ nome, descricao, capacidade, tipo })
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o ano foi adicionado com sucesso
    return response.status(200).send({ "success": "Sala registrada com sucesso" });
  }

  async update ({ params, request, response }) {
    const { nome, descricao, capacidade, tipo } = request.only([ 'nome', 'descricao', 'capacidade', 'tipo' ]);

    try {
      var sala = await Sala.findOrFail(params.id)
      sala.nome = nome
      sala.descricao = descricao
      sala.capacidade = capacidade
      sala.tipo = tipo
      await sala.save()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o ano foi adicionado com sucesso
    return response.status(200).send({ "success": "Sala atualizada com sucesso" });
  }

  async destroy ({ params, request, response }) {
    try {
      var sala = await Sala.findOrFail(params.id)
      await sala.delete() 
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o ano foi adicionado com sucesso
    return response.status(200).send({ "success": "Sala deletada com sucesso" });
  }
}

module.exports = SalaController
