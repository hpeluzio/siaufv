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
          .orderBy('sessoes.data')
          .orderBy('sessoes.horario')
          .groupBy('sessoes.id')
          .orderBy('sessoes.instituto')
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
  
  }

}

module.exports = SalaController
