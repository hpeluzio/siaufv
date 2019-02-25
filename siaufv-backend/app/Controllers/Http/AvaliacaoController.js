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
      .select('avaliacoes.*',
              'salas.id as salas_id',
              'salas.nome as salas_nome',
              'salas.descricao as salas_descricao',
              'anos.id as anos_id',
              'anos.ano as anos_ano',
              'trabalhos.trabalho_id as trabalhos_trabalho_id',
              'trabalhos.nome as trabalhos_nome',
              'trabalhos.orientador as trabalhos_orientador',
              'trabalhos.modalidade as trabalhos_modalidade',
              'trabalhos.area as trabalhos_area',
              'trabalhos.ano_id as trabalhos_ano_id')
      .table('avaliacoes')
      .innerJoin('salas', 'avaliacoes.sala_id', 'salas.id')
      .innerJoin('trabalhos', 'avaliacoes.trabalho_id', 'trabalhos.trabalho_id')
      .innerJoin('anos', 'trabalhos.ano_id', 'anos.id')

    // async () => { 
    //   avaliacoes.map( (item, index) => { 
    //   item.avaliadores_nome = 
    //   await Database
    //     .select('avaliadores.id as avaliadores_id',
    //             'avaliadores.nome as avaliadores_nome',
    //             'avaliadores.curso as avaliadores_curso',
    //             'avaliadores.email as avaliadores_email')
    //     .table('avaliadores')
    //     .innerJoin('avaliador_avaliacao', 'avaliadores.id', 'avaliador_avaliacao.avaliador_id')
    //     .where('avaliador_avaliacao.avaliacao_id', '=', avaliacoes[index].id )
    //   })
    // }

    //Anexando os avaliadores as suas respectivas avaliacoes
    for(let index in avaliacoes){  
      avaliacoes[index].avaliadores_nome = 
      await Database
        .select('avaliadores.id as avaliadores_id',
                'avaliadores.nome as avaliadores_nome',
                'avaliadores.curso as avaliadores_curso',
                'avaliadores.email as avaliadores_email')
        .table('avaliadores')
        .innerJoin('avaliador_avaliacao', 'avaliadores.id', 'avaliador_avaliacao.avaliador_id')
        .where('avaliador_avaliacao.avaliacao_id', '=', avaliacoes[index].id )
    }
    //Anexando os trabalho_autores as suas respectivas avaliacoes
    for(let index in avaliacoes){  
      avaliacoes[index].trabalhos_autores = 
      await Database
        .select('trabalho_autores.id as id',
                'trabalho_autores.trabalho_id as trabalho_id',
                'trabalho_autores.autor as autor')
        .table('trabalho_autores')
        .where('trabalho_autores.trabalho_id', '=', avaliacoes[index].trabalho_id )
    }    
    

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
    console.log( '\nid:' + id,'\ndata:' + data, '\nhorario:' + horario, '\ntipo:' + tipo, '\ntrabalho_id:' + trabalho_id, '\nsala_id:' + sala_id, '\ninstituto' + instituto)
    try {
      //Update de trabalhos
      var avaliacao = await Avaliacao.findOrFail(id)
      avaliacao.data = data
      avaliacao.horario = horario
      avaliacao.tipo = tipo
      avaliacao.trabalho_id = trabalho_id
      avaliacao.instituto = instituto
      avaliacao.sala_id = sala_id

      await avaliacao.save()

      console.log('avaliadores_nome: ', avaliadores_nome, '\n')

      let avaliadores_id_atualizacao = await Database.select('avaliador_id').table('avaliador_avaliacao').where('avaliacao_id','=',id)

      //console.log('avaliadores_id_atualizacao: ', avaliadores_id_atualizacao)
      console.log('avaliadores_id_atualizacao[0]: ', avaliadores_id_atualizacao[0].avaliador_id)
      console.log('avaliadores_id_atualizacao[1]: ', avaliadores_id_atualizacao[1].avaliador_id)


      //Update de avaliadores das avaliacoes
      if(typeof avaliadores_nome !== 'undefined' &&  avaliadores_nome.length > 0){
        //For para percorrer os avaliadores nome
        for(let i in avaliadores_nome){
 
          //Se avaliador_id for diferente do avaliador_id para ser atualizado entao pode modificar
          if (avaliadores_id_atualizacao[i].avaliador_id != avaliadores_nome[i].avaliadores_id){
            //instanciando objeto AvaliadorAvaliacao do banco
            let avaliador_avaliacao = await AvaliadorAvaliacao.findBy({ 'avaliacao_id': avaliacao.id, 'avaliador_id': avaliadores_id_atualizacao[i].avaliador_id })
            //Setando novo valor de avaliador_id na tabela AvaliadorAvaliacao
            avaliador_avaliacao.avaliador_id = avaliadores_nome[i].avaliadores_id
            await avaliador_avaliacao.save()
          }

          //console.log('avaliador_avaliacao: ', JSON.stringify(avaliador_avaliacao))
          // console.log("-=-=-=-=-=-=-")
          // console.log ('typeof avaliadores_nome[i].avaliadores_id:', typeof avaliadores_nome[i].avaliadores_id  ,' - ', avaliadores_nome[i].avaliadores_id)                                                
          // avaliador_avaliacao.avaliador_id = avaliadores_nome[i].avaliadores_id
           
          // console.log("----------")
          // console.log( 'avaliadores_nome[i].avaliadores_id: ', typeof avaliadores_nome[i].avaliadores_id, ' - ', avaliadores_nome[i].avaliadores_id)
          // console.log( 'avaliador_avaliacao.avaliador_id: ', typeof avaliador_avaliacao.avaliador_id, ' - ', avaliador_avaliacao.avaliador_id)
          // console.log( 'avaliador_avaliacao.avaliacao_id: ', typeof avaliador_avaliacao.avaliacao_id, ' - ', avaliador_avaliacao.avaliacao_id)
          // console.log("-=-=-=-=-=-=-")  
          // await avaliador_avaliacao.save()          
        }
      }
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Avaliação foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliação atualizada com sucesso" });

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
