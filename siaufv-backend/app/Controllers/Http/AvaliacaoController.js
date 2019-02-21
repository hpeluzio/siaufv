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
    const avaliacoes = 
    await Database
      .select('avaliacoes.*',
              'salas.id as salas_id',
              'salas.nome as salas_nome',
              'salas.descricao as salas_descricao',
              'avaliadores.id as avaliadores_id',
              'avaliadores.nome as avaliadores_nome',
              'avaliadores.curso as avaliadores_curso',
              'avaliadores.email as avaliadores_email',
              'anos.id as anos_id',
              'anos.ano as anos_ano',
              'trabalhos.trabalho_id as trabalhos_trabalho_id',
              'trabalhos.nome as trabalhos_nome',
              'trabalhos.orientador as trabalhos_orientador',
              'trabalhos.modalidade as trabalhos_orientador',
              'trabalhos.area as trabalhos_area',
              'trabalhos.ano_id as trabalhos_ano_id')
      .table('avaliacoes')
      .innerJoin('salas', 'avaliacoes.sala_id', 'salas.id')
      .innerJoin('trabalhos', 'avaliacoes.trabalho_id', 'trabalhos.trabalho_id')
      .innerJoin('anos', 'trabalhos.ano_id', 'anos.id')
      .innerJoin('avaliador_avaliacao', 'avaliacoes.id', 'avaliador_avaliacao.avaliacao_id')
      .innerJoin('avaliadores', 'avaliadores.id', 'avaliador_avaliacao.avaliador_id')
    return avaliacoes
  }

  async store ({ request, response }) {
    console.log(request.only(['data','horario','tipo','trabalho_id','sala_id','avaliadores_nome', 'instituto']))
    const { data, horario, tipo, trabalho_id, sala_id, avaliadores_nome, instituto} 
        = request.only([
           'data', 'horario', 'tipo', 'trabalho_id', 'sala_id', 'avaliadores_nome', 'instituto' ])

    //console.log(avaliadores_nome)

    try {
      let avaliacao = await Avaliacao.create({ data, horario, tipo, trabalho_id, sala_id, instituto })
      for(var i=0; i < avaliadores_nome.length; i++){
        await AvaliadorAvaliacao.create({ 'avaliador_id': avaliadores_nome[i].avaliadores_id, 'avaliacao_id':  avaliacao.id })
    }  
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliação registrada com sucesso" });
  }

  async update ({ params, request, response }) {
    const { id, data, horario, tipo, trabalho_id, sala_id, avaliadores_nome, instituto } = request.only([ 'id', 'data', 'horario', 'tipo', 'trabalho_id', 'sala_id', 'avaliadores_nome', 'instituto' ]);
    console.log( id, data, horario, tipo, trabalho_id, sala_id, avaliadores_nome, instituto)
    try {
      //Update de trabalhos
      var avaliacao = await Avaliacao.findOrFail(id)
      avaliacao.data = data
      avaliacao.horario = horario
      avaliacao.tipo = tipo
      avaliacao.trabalho_id = trabalho_id
      avaliacao.instituto = instituto
      avaliacao.sala_id = trabalho_id

      await avaliacao.save()

      //Update de avaliadores das avaliacoes
        //Inserts
      if(typeof avaliadores_nome !== 'undefined' &&  avaliadores_nome.length > 0){
        for(var i=0; i < avaliadores_nome.length; i++){

          let avaliador_avaliacao = await AvaliadorAvaliacao.findOrFail(avaliadores_nome[i].avaliadores_id)
          avaliador_avaliacao.avaliador_id = avaliadores_nome[i].avaliadores_id
          avaliador_avaliacao.save()           
        }
      }
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliação atualizada com sucesso" });

  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = AvaliacaoController
