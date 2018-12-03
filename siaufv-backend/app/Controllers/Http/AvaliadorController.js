'use strict'

const Avaliador = use('App/Models/Avaliador')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with avaliadors
 */
class AvaliadorController {
  /**
   * Show a list of all avaliadors.
   * GET avaliadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const avaliadores = await Avaliador.all()
    return avaliadores;
  }

  /**
   * Create/save a new avaliador.
   * POST avaliadors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    
    const { matricula, nome, curso, instituto, email, ano } = request.only([ 'matricula', 'nome', 'curso', 'instituto', 'email', 'ano' ]);
    //console.log(matricula, nome,curso, instituto, email, ano)
    try {
      await Avaliador.create({ matricula, nome, curso, instituto, email, ano })
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador registrado com sucesso" });
  }

  /**
   * Display a single avaliador.
   * GET avaliadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update avaliador details.
   * PUT or PATCH avaliadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    console.log(params.id)
    //return "ok"
    const { matricula, nome, curso, instituto, email, ano } = request.only([ 'matricula', 'nome', 'curso', 'instituto', 'email', 'ano' ]);
    //console.log(matricula, nome,curso, instituto, email, ano)
    console.log('chegou aqui')
    try {
      var avaliador = await Avaliador.findOrFail(params.id)
      avaliador.matricula = matricula
      avaliador.curso = curso
      avaliador.instituto = instituto
      avaliador.email = email
      avaliador.ano = ano
      await avaliador.save()
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador registrado com sucesso" });
  }

  /**
   * Delete a avaliador with id.
   * DELETE avaliadors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    try {
      var avaliador = await Avaliador.findOrFail(params.id)
      await avaliador.delete()
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador deletado com sucesso" });
  }
}

module.exports = AvaliadorController
