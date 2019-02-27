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
        console.log(
            request.only([ 'data', 'horario', 'tipo', 'sala_id', 'instituto', 'ano_id', 'avaliacoes' ])
        )
        const {
            data, horario, tipo, sala_id, instituto, ano_id, avaliacoes
        } = request.only([ 'data', 'horario', 'tipo', 'sala_id', 'instituto', 'ano_id', 'avaliacoes' ])

        //return

        try {
            const sessao = await Sessao.create({
                data, horario, tipo, sala_id, instituto, ano_id
            })
            for (let item of avaliacoes) {
                const avaliacao = await Avaliacao.create({
                    sessao_id: sessao.id,
                    trabalho_id: item.trabalho_id,
                })
                await AvaliadorAvaliacao.create({
                    avaliador_id: item.avaliador1_id,
                    avaliacao_id: avaliacao.id,
                })
                await AvaliadorAvaliacao.create({
                    avaliador_id: item.avaliador2_id,
                    avaliacao_id: avaliacao.id,
                })
            }
        } catch (error) {
            console.log(error)
            return response.status(500).send({ error: error })
        }
        //Se chegou até aqui então o Trabalho foi adicionado com sucesso
        return response
            .status(200)
            .send({ success: 'Sessão registrada com sucesso' })
    }

    async update({ params, request, response }) {
        console.log(
            request.only([ 'data', 'horario', 'tipo', 'sala_id', 'instituto', 'ano_id', 'avaliacoes' ])
        )
        const {
            data, horario, tipo, sala_id, instituto, ano_id, avaliacoes
        } = request.only([ 'data', 'horario', 'tipo', 'sala_id', 'instituto', 'ano_id', 'avaliacoes'])

        //return

        try {
            var sessao = await Sessao.findOrFail(params.id)
            sessao.data = data
            sessao.horario = horario
            sessao.tipo = tipo
            sessao.sala_id = sala_id
            sessao.instituto = instituto
            sessao.ano_id = ano_id
            sessao.save()

            // if(avaliacoes.length > 0){
            //     for (let item of avaliacoes) {
            //         const avaliacao = await Avaliacao.create({
            //             sessao_id: sessao.id,
            //             trabalho_id: item.trabalho_id,
            //         })
            //         await AvaliadorAvaliacao.create({
            //             avaliador_id: item.avaliador1_id,
            //             avaliacao_id: avaliacao.id,
            //         })
            //         await AvaliadorAvaliacao.create({
            //             avaliador_id: item.avaliador2_id,
            //             avaliacao_id: avaliacao.id,
            //         })
            //     }
            // }    
            var avaliacoesDoBancoQuery = await Database
            .select('*')
            .table('avaliacoes')
            .where('avaliacoes.sessao_id', '=', sessao.id)

            console.log('typeof avaliacoesDoBancoQuery:', typeof avaliacoesDoBancoQuery, '\n')
            console.log('\navaliacoesDoBancoQuery: ', JSON.stringify(avaliacoesDoBancoQuery, '\n\n'))
            console.log('\navaliacoesDoBancoQuery: ', JSON.stringify(avaliacoesDoBancoQuery, '\n\n'))
            //console.log('ID do primeiro: ', avaliacoesDoBanco[0].id)

            //let avaliacoesDoBanco = JSON.parse(JSON.stringify(avaliacoesDoBancoQuery))
            //avaliacoesDoBanco.map( (avaliacaoDoBanco,index) => {
            //for(let [avaliacaoDobanco, index] of avaliacoesDoBancoQuery){
            //for(let i=0; i < avaliacoesDoBancoQuery.length; i++){
            //     avaliacoes.map( avaliacaoDatatable => {
            //         if(avaliacoesDoBancoQuery[i].id === avaliacaoDatatable.id)
            //             avaliacoesDoBanco[i].splice(index)
            //     })
            // }
            //})

            //
            //for(let i in avaliacoesDoBancoQuery){
            avaliacoesDoBancoQuery.map( (avaliacaoDoBanco,index) => {
                avaliacoes.map( avaliacaoDatatable => {
                    if(avaliacaoDoBanco.id === avaliacaoDatatable.id)
                        console.log('\n OIOIOIOI: ',avaliacoesDoBancoQuery[index])
                })
            })



            
            console.log('avaliacoesDoBancoQuery: ', JSON.stringify(avaliacoesDoBancoQuery))


            // for (let id of avaliacoes_deletadas) {
            //     console.log('AQUI: ', id)
            //     var avaliacao = await Avaliacao.find(id)
            //     await avaliacao.delete()
            // }

        } catch (error) {
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
            var sessao = await Sessao.findOrFail(params.id)
            await sessao.delete()
        } catch (error) {
            console.log(error)
            return response.status(500).send({ error: error })
        }
        //Se chegou até aqui então o avaliacao foi adicionada com sucesso
        return response
            .status(200)
            .send({ success: 'Sessão deletada com sucesso' })
    }
}

module.exports = SessaoController
