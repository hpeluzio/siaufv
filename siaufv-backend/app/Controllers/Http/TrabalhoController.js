'use strict'

const Database = use('Database')
const Trabalho = use('App/Models/Trabalho')
const TrabalhoAutor = use('App/Models/TrabalhoAutor')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with trabalhos
 */
class TrabalhoController {
  /**
   * Show a list of all trabalhos.
   * GET trabalhos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //const trabalhos = await Trabalho.all().with('trabalho_autor')

    const trabalhos = await Database
    .select('trabalhos.trabalho_id', 'nome', 'autor', 'orientador', 'modalidade', 'area', 'ano')
    .table('trabalhos')
    .innerJoin('trabalho_autors', function () {
      this
        .on('trabalhos.trabalho_id', 'trabalho_autors.trabalho_id')
    })

    //var trabalho_autor = await TrabalhoAutor.all()
    
    //console.log("iodmnex")
    //console.log(trabalho_autor.length)
    //console.log(trabalho_autor[0].trabalho_id)

    //console.log(JSON.parse(trabalho_autor))

    return trabalhos
  }

  /**
   * Create/save a new trabalho.
   * POST trabalhos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { id, nome, autor, orientador, modalidade, area, ano } = request.only([ 'id', 'nome', 'autor', 'orientador', 'modalidade', 'area', 'ano' ]);
    //console.log(matricula, nome,curso, instituto, email, ano)
    try {
      await Trabalho.create({ id, nome, autor, orientador, modalidade, area, ano })
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Trabalho registrado com sucesso" });
  }

  /**
   * Display a single trabalho.
   * GET trabalhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing trabalho.
   * GET trabalhos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update trabalho details.
   * PUT or PATCH trabalhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    console.log(params.id)

    const { id, nome, autor, orientador, modalidade, area, ano } = request.only([ 'id', 'nome', 'autor', 'orientador', 'modalidade', 'area', 'ano' ]);

    try {
      var trabalho = await Trabalho.findOrFail(params.id)
      trabalho.id = id
      trabalho.nome = nome
      trabalho.orientador = orientador
      trabalho.modalidade = modalidade
      trabalho.area = area
      trabalho  .ano = ano
      await trabalho.save()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Trabalho registrado com sucesso" });
  }

  /**
   * Delete a trabalho with id.
   * DELETE trabalhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    try {
      var trabalho = await Trabalho.findOrFail(params.id)
      await trabalho.delete()
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Trabalho deletado com sucesso" });
  }

  //Pegar todos os autores de um trabalho
  async getAutores ({ params, request, response }) {
    console.log(params.trabalho_id)
    const autores = await TrabalhoAutor
      .query()
      .where('trabalho_id', '=', params.trabalho_id)
      .fetch()

    console.log(autores)
    return autores

  }

}

module.exports = TrabalhoController
