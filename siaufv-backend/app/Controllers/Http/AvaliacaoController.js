'use strict'

const Avaliacao = use('App/Models/Avaliacao')
const AvaliadorAvaliacao = use('App/Models/AvaliadorAvaliacao')
const Database = use('Database')

/**
 * Resourceful controller for interacting with avaliacaos
 */
class AvaliacaoController {
  /**
   * Show a list of all avaliacaos.
   * GET avaliacaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //return response.status(200).send({ "success": "Avaliacao INDEX" });
    //const q = await Avaliacao.all()
    //return await Avaliacao.all()
    let avaliacoes = 
    await Database
      .select('avaliacoes.*')
      .table('avaliacoes')

    //Anexando os avaliadores as suas respectivas avaliacoes
    for(let index in avaliacoes){  
      avaliacoes[index].avaliadores = 
      await Database
        .select('*')
        .table('avaliadores')
        .innerJoin('avaliador_avaliacao', 'avaliadores.id', 'avaliador_avaliacao.avaliador_id')
        .where('avaliador_avaliacao.avaliacao_id', '=', avaliacoes[index].id )
    }

    //Anexando os trabalho_autores as suas respectivas avaliacoes
    for(let index in avaliacoes){  
      avaliacoes[index].trabalho = 
      await Database
        .select('trabalhos.*')
        .table('trabalhos')
        .where('trabalhos.trabalho_id', '=', avaliacoes[index].trabalho_id )
    }    

    for(let index in avaliacoes){  
      avaliacoes[index].trabalho = 
      await Database
        .select('trabalhos.*')
        .table('trabalhos')
        .where('trabalhos.trabalho_id', '=', avaliacoes[index].trabalho_id )
    }     

    for(let index in avaliacoes){  
      avaliacoes[index].trabalho.autores = 
      await Database
        .select('trabalho_autores.*')
        .table('trabalho_autores')
        .where('trabalho_autores.trabalho_id', '=', avaliacoes[index].trabalho_id )
    }    

    return avaliacoes
  }

  async store ({ request, response }) {
    console.log(request.only([ 'sessao_id','trabalho_id','avaliadores' ]))
    const { sessao_id, trabalho_id, avaliadores } 
        = request.only([
           'sessao_id', 'trabalho_id', 'avaliadores' ])

    console.log('sessao_id:', sessao_id, '\ntrabalho_id: ', '\ntrabalho_id: ', avaliadores)

    //TRY
    try {
      
      const avaliacao = await Avaliacao.create({ sessao_id, trabalho_id })

      //Inserindo os avaliadores na avaliação
      for(let avaliador of avaliadores){
        await AvaliadorAvaliacao.create({ 'avaliador_id': avaliador.avaliadores_id, 'avaliacao_id':  avaliacao.id })
      }  
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliação registrada com sucesso" });
  }

  async destroy ({ params, request, response }) {
    try {
      var avaliacao = await Avaliacao.findOrFail(params.id)
      await avaliacao.delete()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliacao foi adicionada com sucesso
    return response.status(200).send({ "success": "Avaliacao deletada com sucesso" });
  }
}

module.exports = AvaliacaoController
