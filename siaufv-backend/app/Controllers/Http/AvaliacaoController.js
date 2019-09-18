'use strict'

const Sessao = use('App/Models/Sessao')
const Avaliacao = use('App/Models/Avaliacao')
const AvaliadorAvaliacao = use('App/Models/AvaliadorAvaliacao')
const Database = use('Database')
const Helpers = use('App/Helpers')

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
      avaliacoes[index].trabalho[0].autores = 
      await Database
        .select('trabalho_autores.*')
        .table('trabalho_autores')
        .where('trabalho_autores.trabalho_id', '=', avaliacoes[index].trabalho_id )
    }    

    return avaliacoes
  }

  async store ({ request, response }) {

    //Verificando se o avaliador está disponivel
    ////////////////////////////////////////////////////////////////////////
    const { sessao_id, trabalho_id, avaliador1_id, avaliador2_id } 
        = request.only([
           'sessao_id', 'trabalho_id', 'avaliador1_id', 'avaliador2_id' ])    

    const sessao = await Sessao.findOrFail(sessao_id)

    //Somente para as sessões paineis faremos essa verificação de avaliadores
    if(sessao.tipo === 0) {
      var obj = new Helpers();
      if( !await obj.confereSeAvaliadorEstaDisponivel(sessao_id, avaliador1_id ))
        return response.status(409).send({ "error": "Este avaliador já foi cadastrado em outra sessão de mesmo horário" });
      if( !await obj.confereSeAvaliadorEstaDisponivel(sessao_id, avaliador2_id ))
        return response.status(409).send({ "error": "Este avaliador já foi cadastrado em outra sessão de mesmo horário" });        
    }
    //console.log ('O avaliador', avaliador1_id, 'esta disponivel para sessao ',  sessao_id,'? ')
    ////////////////////////////////////////////////////////////////////////


    try {
      //Criando avaliacao
      const avaliacao = await Avaliacao.create({ sessao_id, trabalho_id })

      //Adicionando os avaliadores
      await AvaliadorAvaliacao.create({ 'avaliador_id': avaliador1_id, 'avaliacao_id':  avaliacao.id })
      await AvaliadorAvaliacao.create({ 'avaliador_id': avaliador2_id, 'avaliacao_id':  avaliacao.id })
  
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
