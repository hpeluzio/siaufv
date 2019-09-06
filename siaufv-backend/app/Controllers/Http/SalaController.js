'use strict'

const Database = use('Database')
const Sala = use('App/Models/Sala')
const Sessao = use('App/Models/Sessao')
const Avaliacao = use('App/Models/Avaliacao')
const AvaliadorAvaliacao = use('App/Models/AvaliadorAvaliacao')

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

  async sessoes_por_sala ({ request, response, view }) {

    const salas = await Database
      .select('salas.*')
      .table('salas')
      .innerJoin('sessoes', 'sessoes.sala_id', 'salas.id')
      .orderBy('salas.nome')
      .groupBy('salas.id')

    // salas.forEach(sala => {
    //   sala.sessoes = 
    //     await Database
    //     .select('*')
    //     .table('sessoes')
    //     .where('sessoes.sala_id', '=', salas[index].id )
    // })

    for(let index in salas){
      salas[index].sessoes =
        await Database
          .select('sessoes.*')
          .table('avaliacoes')
          .innerJoin('sessoes', 'avaliacoes.sessao_id', 'sessoes.id')
          .where('sessoes.sala_id', '=', salas[index].id )
    }

    for(let index in salas){
      for(let index2 in salas[index].sessoes){
        salas[index].sessoes[index2].avaliacoes =
        await Database
          .select('*')
          .table('trabalhos')
          .innerJoin('avaliacoes', 'trabalhos.trabalho_id', 'avaliacoes.trabalho_id')
          .where('avaliacoes.sessao_id', '=', salas[index].sessoes[index2].id )
      }
    }

    for(let index in salas){
      for(let index2 in salas[index].sessoes){
        for(let index3 in salas[index].sessoes[index2].avaliacoes){
          salas[index].sessoes[index2].avaliacoes[index3].avaliadores =
            await Database
              .select('*')
              .table('avaliadores')
              .innerJoin('avaliador_avaliacao', 'avaliadores.id', 'avaliador_avaliacao.avaliador_id')
              //.innerJoin('avaliacoes_id', 'avaliador_avaliacao.avaliacao_id', 'avaliacoes.id')
              .where('avaliador_avaliacao.avaliacao_id', '=', salas[index].sessoes[index2].avaliacoes[index3].id )
        }
      }
    }    


    return salas

    const trabalhos = 
      await Database
        .select('trabalhos.*', 
          'anos.ano as ano',
          'sessoes.id as sessao_id',
          'sessoes.nome as sessao_nome',
          'sessoes.data as sessao_data',
          'sessoes.horario as sessao_horario',
          'sessoes.horariofim as sessao_horariofim',
          'sessoes.ano_id as sessao_ano_id',
          'sessoes.sala_id as sessao_sala_id',
          'salas.id as sala_sala_id',
          'salas.nome as sala_nome',
          'salas.tipo as sala_tipo'          
        )
        .table('trabalhos')
        .innerJoin('anos', 'trabalhos.ano_id', 'anos.id')
        .innerJoin('avaliacoes', 'trabalhos.trabalho_id', 'avaliacoes.trabalho_id')
        .innerJoin('sessoes', 'avaliacoes.sessao_id', 'sessoes.id')
        .innerJoin('salas', 'salas.id', 'sessoes.sala_id')

    return trabalhos


    // for(let index in trabalhos){  
    //   trabalhos[index].autores = 
    //   await Database
    //     .select('*')
    //     .table('trabalho_autores')
    //     .where('trabalho_autores.trabalho_id', '=', trabalhos[index].trabalho_id )
    // }

    // for(let index in trabalhos){  
    //   trabalhos[index].avaliadores = 
    //     await Database
    //     .select('avaliadores.*')
    //     .from('avaliadores')
    //     .innerJoin('avaliador_avaliacao', 'avaliador_avaliacao.avaliador_id', 'avaliadores.id')
    //     .innerJoin('avaliacoes', 'avaliador_avaliacao.avaliacao_id', 'avaliacoes.id')
    //     .innerJoin('trabalhos', 'trabalhos.trabalho_id', 'avaliacoes.trabalho_id')
    //     .where('trabalhos.trabalho_id', '=', trabalhos[index].trabalho_id)
    // }    
  }

}

module.exports = SalaController
