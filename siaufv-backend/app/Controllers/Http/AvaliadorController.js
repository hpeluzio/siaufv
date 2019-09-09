'use strict'

const Avaliador = use('App/Models/Avaliador')
const Database = use('Database')


class AvaliadorController {

  async index ({ request, response, view }) {
    //return await Avaliador.all()
    const avaliadores = 
      await Database
        .select('*')
        .table('avaliadores')
    return avaliadores
  }

  async avaliador_ativo ({ request, response, view }) {
    //return await Avaliador.all()
    const avaliadores = 
      await Database
        .select('*')
        .table('avaliadores')
        .where('avaliadores.ativo', '=', 1)
    return avaliadores
  }  

  async store ({ request, response }) {
    
    const { matricula, nome, curso, instituto, email, ativo } = request.only([ 'matricula', 'nome', 'curso', 'instituto', 'email', 'ativo' ]);
    //console.log(matricula, nome,curso, instituto, email, ano)
    try {
      await Avaliador.create({ matricula, nome, curso, instituto, email, ativo })
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador registrado com sucesso" });
  }


  async update ({ params, request, response }) {
    const { matricula, nome, curso, instituto, email, ativo } = 
      request.only([ 'matricula', 'nome', 'curso', 'instituto', 'email', 'ativo' ]);

    try {
      var avaliador = await Avaliador.findOrFail(params.id)
      avaliador.matricula = matricula
      avaliador.nome = nome
      avaliador.curso = curso
      avaliador.instituto = instituto
      avaliador.email = email
      avaliador.ativo = ativo
      await avaliador.save()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador registrado com sucesso" });
  }

  async destroy ({ params, request, response }) {
    try {
      var avaliador = await Avaliador.findOrFail(params.id)
      await avaliador.delete()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador deletado com sucesso" });
  }

  async avaliador_ativar ({ params, request, response }) {
    const { ativo } = 
      request.only([ 'ativo' ]);

    try {
      var avaliador = await Avaliador.findOrFail(params.id)
      avaliador.ativo = ativo
      await avaliador.save()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador ativado com sucesso" });
  }
  
  async avaliadores_por_instituto({ request, response, view }) {

    const avaliadores = 
      await Database
        .select(
          'avaliadores.*',
          'avaliacoes.trabalho_id',
          'sessoes.id as sessao_id',
          'sessoes.nome as sessao_nome',
          'sessoes.data as sessao_data',
          'sessoes.horario as sessao_horario',
          'sessoes.horariofim as sessao_horariofim',
          'sessoes.ano_id as sessao_ano_id',
          'sessoes.sala_id as sessao_sala_id',
          'salas.id as sala_sala_id',
          'salas.nome as sala_nome',
          'salas.tipo as sala_tipo',
          'anos.ano as ano',
          'trabalhos.nome as trabalhos_nome'
        )
        .table('avaliadores')
        .innerJoin('avaliador_avaliacao', 'avaliador_avaliacao.avaliador_id', 'avaliadores.id')
        .innerJoin('avaliacoes', 'avaliador_avaliacao.avaliacao_id', 'avaliacoes.id')
        .innerJoin('sessoes', 'sessoes.id', 'avaliacoes.sessao_id')
        .innerJoin('trabalhos', 'trabalhos.trabalho_id', 'avaliacoes.trabalho_id')
        .innerJoin('salas', 'sessoes.sala_id', 'salas.id')
        .innerJoin('anos', 'sessoes.ano_id', 'anos.id')
        //.where('avaliadores.ativo', '=', 1)
        .orderBy('avaliadores.nome', 'asc')
        .orderBy('sessao_data', 'asc')
        .orderBy('sessao_horario', 'asc')
    return avaliadores

}   

}

module.exports = AvaliadorController
