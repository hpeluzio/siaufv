'use strict'

const moment = use('moment')
const Database = use('Database')
const Sessao = use('App/Models/Sessao')

class Helpers {

    async confereSeAvaliadorEstaDisponivel (sessao_id, avaliador_id) {

      var sessoes = await Database.select(
        'sessoes.*',
        'avaliadores.id as avaliador_id',
        'avaliadores.nome as avaliador_nome',
      )
        .table('sessoes')
        .innerJoin('avaliacoes', 'sessoes.id', 'avaliacoes.sessao_id')
        .innerJoin('avaliador_avaliacao', 'avaliador_avaliacao.avaliacao_id', 'avaliacoes.id')
        .innerJoin('avaliadores', 'avaliadores.id', 'avaliador_avaliacao.avaliador_id')

      //console.log('SESSOES: ', sessoes)        

      const sessao_do_avaliador = await Sessao.findOrFail(sessao_id)

      //Filtrador de avaliador inicializado como false
      var avaliadorDisponivel = true

      //Mapea as sessoes procurando sessoes com mesmo intervalo de tempo
      //Se entrar checa se estao tentando colocar o mesmo avaliador de mesma id
      //Se tiver mesma id entao esse metodo retorna false, o avaliador nao esta disponivel
      sessoes.map( sessao => {
        //Se a sessao for a mesma do avaliado entao nao faz sentido filtrar
        if(sessao.id !== sessao_do_avaliador.id){
          if (sessao.data === sessao_do_avaliador.data && 
            this.checkRangeIntervalHorario(sessao.horario, sessao.horariofim, sessao_do_avaliador.horario, sessao_do_avaliador.horariofim)){
              //Se avaliador for o mesmo então podemos retornar avaliador indisponivel
              if(sessao.avaliador_id == avaliador_id){
              avaliadorDisponivel = false
            }
          }
        }  
      })  

      return avaliadorDisponivel
    }

    checkRangeIntervalHorario (ini1, end1, ini2, end2) {
      var timeini1 = ini1
      var timeend1 = end1
      var timeini2 = ini2
      var timeend2 = end2

      //console.log(timeini1, timeend1, timeini2, timeend2)
    
      if(timeini2 === timeini1 || 
          timeend2 === timeend1 || 
              timeini2 < timeini1 && timeend2 > timeini1 ||
                timeini2 > timeini1 && timeini2 < timeend1)
                  return true //'INTERVALADO'
    
      if(timeend2 <= timeini1 || timeini2 >= timeend1)
        return false//'Não intervalado' 
    }    

}

module.exports = Helpers
