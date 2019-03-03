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

    for(let index in sessoes){  
        sessoes[index].avaliacoes = 
        await Database
            .select('*')
            .table('avaliacoes')
            .where('avaliacoes.sessao_id', '=', sessoes[index].id )
        }   

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
            request.only([ 'nome', 'data', 'horario', 'tipo', 'sala_id', 'instituto', 'ano_id' ])
        )
        const {
            nome, instituto, ano_id
        } = request.only([ 'nome', 'instituto', 'ano_id'])

        
        try {
            //beginTransaction
            //const trx = await Database.beginTransaction()
            var sessao = await Sessao.findOrFail(params.id)
            sessao.nome = nome
            //sessao.data = data
            //sessao.horario = horario
            //sessao.horariofim = horariofim
            //sessao.tipo = tipo
            //sessao.sala_id = sala_id
            sessao.instituto = instituto
            sessao.ano_id = ano_id
            sessao.save(/*trx*/)

            // //Pegando as avaliacoes do banco
            // var avaliacoesDoBancoQuery = await Database
            // .select('*')
            // .table('avaliacoes')
            // .where('avaliacoes.sessao_id', '=', sessao.id)

            // //Declarando array que salvará os objetos do banco para serem deletados depois
            // var avaliacoesDoBanco = [] 
            // avaliacoesDoBancoQuery.map( (avaliacaoDoBanco) => {
            //     avaliacoesDoBanco.push(Object.assign({}, avaliacaoDoBanco))
            // }) 

            // //Retirando do array de objetos do banco as avaliacoes que nao necessitarão
            // //de alterações
            // avaliacoesDoBanco.map( (avaliacaoDoBanco, index1) => {
            //     avaliacoes.map( (avaliacaoDaRequest, index2) => {
            //         if(avaliacaoDoBanco.trabalho_id === avaliacaoDaRequest.trabalho_id){
            //             avaliacoesDoBanco.splice(index1, index1+1)
            //             avaliacoes.splice(index2, index2+1)
            //         }
            //     })
            // })            

            // //Logs
            
            // console.log('avaliacoesDoBanco: ', avaliacoesDoBanco)
            // console.log('\navaliacoes: ', avaliacoes)
            // console.log('|--------------------------|\n\n')

            // // Deletando avaliacoes que foram deletadas
            // if(avaliacoesDoBanco.length > 0){
            //     for(let item of avaliacoesDoBanco) {
            //         var avaliacaoParaDeletar = await Avaliacao.findBy('trabalho_id', item.trabalho_id)
            //         await avaliacaoParaDeletar.delete(trx)
            //     }
            // }

            // // Criando nova avaliacoes com seus avaliadores
            // var id_da_nova_sessao = sessao.id
            // if(avaliacoes.length > 0){
            //     for(let item of avaliacoes) {
            //         var avaliacao_criada = await Avaliacao.create({ trabalho_id: item.trabalho_id, sessao_id: id_da_nova_sessao }, trx)
            //         await AvaliadorAvaliacao.create({ avaliador_id: item.avaliador1_id,  avaliacao_id: avaliacao_criada.id }, trx)      
            //         await AvaliadorAvaliacao.create({ avaliador_id: item.avaliador2_id,  avaliacao_id: avaliacao_criada.id }, trx)      
            //     }
            // }

            // var commit = await trx.commit()
            // console.log('commit: ', commit)
            // var rollback = await trx.rollback() 
            // console.log('rollback: ', rollback)
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
}

module.exports = SessaoController
