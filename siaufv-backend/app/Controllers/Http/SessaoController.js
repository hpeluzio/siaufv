'use strict'

const Sessao = use('App/Models/Sessao')
const Avaliacao = use('App/Models/Avaliacao')
const AvaliadorAvaliacao = use('App/Models/AvaliadorAvaliacao')
const Database = use('Database')

/**
 * Resourceful controller for interacting with sessaos
 */
class SessaoController {
    async index({ request, response, view }) {
        var sessoes = await Database.select(
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

        for(let index in sessoes)  
            sessoes[index].avaliacoes = 
                await Database
                    .select('*')
                    .table('avaliacoes')
                    .where('avaliacoes.sessao_id', '=', sessoes[index].id )

        for(let i in sessoes)
            for(let j in sessoes[i].avaliacoes)  
                sessoes[i].avaliacoes[j].avaliadores = //['1','2']     
                    await Database
                    .select('avaliadores.*')
                    .from('avaliadores')
                    .innerJoin('avaliador_avaliacao', 'avaliador_avaliacao.avaliador_id', 'avaliadores.id')
                    .where('avaliador_avaliacao.avaliacao_id', '=', sessoes[i].avaliacoes[j].id)

        return sessoes
    }

    //STORE
    async store({ request, response }) {
        console.log(
            request.only([ 'nome', 'data', 'horario', 'horariofim', 'tipo', 'sala_id', 'instituto', 'ano_id' ])
        )
        const {
            nome, data, horario, horariofim, tipo, sala_id, instituto, ano_id, avaliacoes
        } = request.only([ 'nome', 'data', 'horario', 'horariofim', 'tipo', 'sala_id', 'instituto', 'ano_id' ])

        //return

        try {
            //const trx = await Database.beginTransaction()
            const sessao = await Sessao.create({
                nome, data, horario, horariofim, tipo, sala_id, instituto, ano_id
            }/*, trx*/)

            //await trx.commit()
            return response
            .status(200)
            .send({ success: 'Sessão registrada com sucesso', sessao_id: sessao.id  })

        } catch (error) {
            //await trx.rollback()
            console.log(error)
            return response.status(500).send({ error: error })
        }
        //Se chegou até aqui então o Trabalho foi adicionado com sucesso

    }

    //UPDATE
    async update({ params, request, response }) {
        console.log('|********************************|\n\n')
        console.log(
            request.only([ 'nome', 'data', 'horario', 'horariofim', 'tipo', 'sala_id', 'instituto', 'ano_id' ])
        )
        const {
            nome, data, horario, horariofim, tipo, sala_id, instituto, ano_id
        } = request.only([ 'nome', 'data', 'horario', 'horariofim', 'tipo', 'sala_id', 'instituto', 'ano_id'])

        
        try {
            //beginTransaction
            //const trx = await Database.beginTransaction()
            var sessao = await Sessao.findOrFail(params.id)
            sessao.nome = nome
            sessao.data = data
            sessao.horario = horario
            sessao.horariofim = horariofim
            sessao.tipo = tipo
            sessao.sala_id = sala_id
            sessao.instituto = instituto
            sessao.ano_id = ano_id
            sessao.save(/*trx*/)

        } catch (error) {
            //await trx.rollback() 
            console.log(error)
            return response.status(500).send({ error: error })
        }
        //Se chegou até aqui então o Trabalho foi adicionado com sucesso
        return response
            
            .status(200)
            .send({ success: 'Sessão registrada com sucesso' })    
    }

    async destroy({ params, request, response }) {
        try {
            const trx = await Database.beginTransaction()

            var sessao = await Sessao.findOrFail(params.id)
            await sessao.delete(trx)

            await trx.commit()
        } catch (error) {
            console.log(error)
            return response.status(500).send({ error: error })
        }
        //Se chegou até aqui então o avaliacao foi adicionada com sucesso
        return response
            .status(200)
            .send({ success: 'Sessão deletada com sucesso' })
    }

    async sessao_report({ request, response, view }) {
        var sessoes = await Database
            .select(
            'sessoes.*',
            'anos.id as anos_id',
            'anos.ano as anos_ano',
            'salas.id as salas_id',
            'salas.nome as salas_nome',
            'salas.descricao as salas_descricao',
            'salas.capacidade as salas_capacidade',
            'salas.tipo as salas_tipo',
            'avaliacoes.trabalho_id as avaliacoes_trabalho_id',
            'avaliacoes.sessao_id as avaliacoes_sessao_id',
            'avaliadores.nome as avaliadores_nome',
            )
            .table('sessoes')
            .innerJoin('salas', 'sessoes.sala_id', 'salas.id')
            .innerJoin('anos', 'sessoes.ano_id', 'anos.id')
            .innerJoin('avaliacoes', 'sessoes.id', 'avaliacoes.sessao_id')
            .innerJoin('avaliador_avaliacao', 'avaliador_avaliacao.avaliacao_id', 'avaliacoes.id')
            .innerJoin('avaliadores', 'avaliadores.id', 'avaliador_avaliacao.avaliador_id')
            .orderBy('data', 'asc')
            .orderBy('horario', 'asc')

        return sessoes
    }    
}

module.exports = SessaoController
