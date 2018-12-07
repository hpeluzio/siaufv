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
    const trabalhos = await Trabalho.all()
    const trabalhos_autores = await TrabalhoAutor.all()


    // const trabalhos = await Database
    //   .select('trabalhos.trabalho_id', 'nome', 'autor', 'orientador', 'modalidade', 'area', 'ano')
    //   .table('trabalhos')
    //   .innerJoin('trabalho_autors', function () {
    //     this
    //       .on('trabalhos.trabalho_id', 'trabalho_autors.trabalho_id')
    // })

    //var trabalho_autor = await TrabalhoAutor.all()
    
    //console.log("iodmnex")
    //console.log(trabalho_autor.length)
    //console.log(trabalho_autor[0].trabalho_id)

    //console.log(JSON.parse(trabalho_autor))

    return { 'trabalhos': trabalhos, 'trabalhos_autores':trabalhos_autores }//, trabalhosAutores
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
    const { trabalho_id, nome, autores, orientador, modalidade, area, ano } = request.only([ 'trabalho_id', 'nome', 'autores','orientador', 'modalidade', 'area', 'ano' ]);
    //console.log(matricula, nome,curso, instituto, email, ano)
    //console.log(autores[0].autor)
    console.log(autores)
    for(var i=0; i < autores.length; i++)
      console.log(autores[i].autor)
    try {
      await Trabalho.create({ trabalho_id, nome, orientador, modalidade, area, ano })
      for(var i=0; i < autores.length; i++){
        await TrabalhoAutor.create({ 'trabalho_id': trabalho_id, 'autor': autores[i].autor })
      }  
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
   * Update trabalho details.
   * PUT or PATCH trabalhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    //console.log(params.id)

    const { id, trabalho_id, nome, autores, deletedAutores, orientador, modalidade, area, ano } = request.only([ 'id', 'trabalho_id', 'nome', 'autores', 'deletedAutores', 'orientador', 'modalidade', 'area', 'ano' ]);
    
    if(typeof autores !== 'undefined' &&  autores.length > 0){
       console.log("autores")
       console.log(autores)}
    if(deletedAutores){
       console.log('deletedAutores')
       console.log(deletedAutores)}

    try {
      //Update de trabalhos
      var trabalho = await Trabalho.findOrFail(id)
      trabalho.trabalho_id = trabalho_id
      trabalho.nome = nome
      trabalho.orientador = orientador
      trabalho.modalidade = modalidade
      trabalho.area = area
      trabalho.ano = ano
      await trabalho.save()

      //Update de autores dos trabalhos
        //Inserts
      if(typeof autores !== 'undefined' &&  autores.length > 0){
        for(var i=0; i < autores.length; i++){
          
          if(!autores[i].id || autores[i].id === 'undefined'){
            await TrabalhoAutor.create({ 'trabalho_id': trabalho_id, 'autor': autores[i].autor })
          } else {
            var trabalho_autor = await TrabalhoAutor.findOrFail(autores[i].id)
            trabalho_autor.autor = autores[i].autor
            trabalho_autor.save()           
          }
        }
      }

        //Deletes
      if (typeof deletedAutores !== 'undefined' && deletedAutores.length > 0) {
        for(var i=0; i < deletedAutores.length; i++){
          if(deletedAutores[i].id){
            var trabalho_autor = await TrabalhoAutor.findOrFail(deletedAutores[i].id)
            await trabalho_autor.delete()
          }
        }
      }
      //Fim Deletes  

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

    console.log(params.trabalho_id)
    try {
      var trabalho = await Trabalho.findByOrFail('trabalho_id', params.trabalho_id)
      await trabalho.delete()
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Trabalho deletado com sucesso" });
  }

  //Pegar todos os autores de um trabalho
  async getTrabalhosAutores ({ params, request, response }) {
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
