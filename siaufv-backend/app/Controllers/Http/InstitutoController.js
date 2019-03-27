'use strict'

const Instituto = use('App/Models/Instituto')

/**
 * Resourceful controller for interacting with institutos
 */
class InstitutoController {

  async index ({ request, response, view }) {
    return await Instituto.all()
  }

  async store ({ request, response }) {
    const { instituto } = request.only([ 'instituto' ]);

    try {
      await Instituto.create({ instituto })
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o instituto foi adicionado com sucesso
    return response.status(200).send({ "success": "Instituto registrado com sucesso" });
  }

  async update ({ params, request, response }) {
    const { instituto } = request.only([ 'instituto' ]);

    try {
      var institutoParaAtualizar = await Instituto.findOrFail(params.id)
      institutoParaAtualizar.instituto = instituto
      await institutoParaAtualizar.save()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o instituto foi adicionado com sucesso
    return response.status(200).send({ "success": "Instituto atualizado com sucesso" });
  }

  async destroy ({ params, request, response }) {

    try {
      var instituto = await Instituto.findOrFail(params.id)
      await instituto.delete() 
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o instituto foi adicionado com sucesso
    return response.status(200).send({ "success": "Instituto deletado com sucesso" });
  }
}

module.exports = InstitutoController
