'use strict'

const Sessao = use('App/Models/Sessao')
const Database = use('Database')

/**
 * Resourceful controller for interacting with sessaos
 */
class SessaoController {
    async index({ request, response, view }) {
        const sessoes = await Database.select(
            'sessoes.*',
            'anos.id as anos_id',
            'anos.ano as anos_ano',
            'salas.id as sala_id',
            'salas.nome as sala_nome',
            'salas.descricao as sala_descricao'
        )
            .table('sessoes')
            .innerJoin('salas', 'sessoes.sala_id', 'salas.id')
            .innerJoin('anos', 'sessoes.ano_id', 'anos.id')

        return sessoes
    }

    async store({ request, response }) {
      console.log(request.only(['data','horario','tipo','sala_id', 'instituto', 'ano_id']))
      const { data, horario, tipo, sala_id, instituto, ano_id} 
          = request.only([
             'data', 'horario', 'tipo', 'sala_id', 'instituto', 'ano_id' ])
  
      //return

      try {
        let sessao = await Sessao.create({ data, horario, tipo, sala_id, instituto, ano_id})
        // for(var i=0; i < avaliadores_nome.length; i++){
        //   await AvaliadorAvaliacao.create({ 'avaliador_id': avaliadores_nome[i].avaliadores_id, 'avaliacao_id':  avaliacao.id })
        // }  
      } catch (error) {
        console.log(error)
        return response.status(500).send({ "error": error });
      }
      //Se chegou até aqui então o Trabalho foi adicionado com sucesso
      return response.status(200).send({ "success": "Seção registrada com sucesso" });
    }

    async update({ params, request, response }) {}

    async destroy({ params, request, response }) {
      try {
        var sessao = await Sessao.findOrFail(params.id)
        await sessao.delete()
      } catch (error) {
        console.log(error)
        return response.status(500).send({ "error": error });
      }
      //Se chegou até aqui então o avaliacao foi adicionada com sucesso
      return response.status(200).send({ "success": "Sessão deletada com sucesso" });      
    }
}

module.exports = SessaoController
