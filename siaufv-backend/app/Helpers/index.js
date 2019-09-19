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

    async confereSeSalaEstaDisponivelStore (data, horario, horariofim, sala_id) {
      
      var sessoes = await Database.select(
        'sessoes.*'
      )
        .table('sessoes')

      //Filtrador de avaliador inicializado como false
      var salaDisponivel = true

      //Mapea as sessoes procurando sessoes com mesmo intervalo de tempo
      //Se entrar checa se estao tentando colocar o mesmo avaliador de mesma id
      //Se tiver mesma id entao esse metodo retorna false, o avaliador nao esta disponivel
      sessoes.map( sessao => {
        //Se a sessao for a mesma do avaliado entao nao faz sentido filtrar
        //console.log('POST: ',  data, horario, horariofim, sala_id)
        //console.log('SESSAO: ',  sessao.data, sessao.horario, sessao.horariofim, sessao.sala_id)

        if (moment.utc(String(sessao.data)).format('YYYY-MM-DD') == data &&
              sessao.sala_id == sala_id &&
                this.checkRangeIntervalHorario(sessao.horario, sessao.horariofim, horario, horariofim)){
            //Se sala tiver mesmo horario que outra sessao enta nao esta disponivel 
              salaDisponivel = false
        }
 
      })  
      console.log('salaDisponivel:',  salaDisponivel)
      
      return salaDisponivel
    }    

    async confereSeSalaEstaDisponivelUpdate (sessao_id, data, horario, horariofim, sala_id) {
      moment.suppressDeprecationWarnings = true;
      const sessao_a_ter_horario_conferido = await Sessao.findOrFail(sessao_id)

      //console.log('__________post________________.data: ', horario, horariofim, sala_id, data)
      //console.log('_________sessaoatual__________.data: ', sessao_a_ter_horario_conferido.horario, sessao_a_ter_horario_conferido.horariofim, sessao_a_ter_horario_conferido.sala_id, moment.utc(String(sessao_a_ter_horario_conferido.data)).format('YYYY-MM-DD'))

      //Se não mudou nada então retorne true
      if (moment.utc(String(sessao_a_ter_horario_conferido.data)).format('YYYY-MM-DD') == moment.utc(String(data)).format('YYYY-MM-DD') &&
            sessao_a_ter_horario_conferido.horario == horario &&
              sessao_a_ter_horario_conferido.horariofim == horariofim &&
                sessao_a_ter_horario_conferido.sala_id == sala_id)
                return true

      //Pega todas as sessões
      var sessoes = await Database.select(
        'sessoes.*'
      )
        .table('sessoes')

      //Filtrador de avaliador inicializado como false
      var salaDisponivel = true

      //Mapea as sessoes procurando sessoes com mesmo intervalo de tempo
      //Se entrar checa se estao tentando colocar o mesmo avaliador de mesma id
      //Se tiver mesma id entao esse metodo retorna false, o avaliador nao esta disponivel
      sessoes.map( sessao => {
        //Se a sessao for a mesma do avaliado entao nao faz sentido filtrar
        //console.log('POST: ',  data, horario, horariofim, sala_id)
        //console.log('SESSAO: ',  sessao.data, sessao.horario, sessao.horariofim, sessao.sala_id)

        //console.log('ID: ', sessao.id, sessao_a_ter_horario_conferido.id)
        //console.log('sessao:',sessao.id, moment.utc(String(sessao.data)).format('YYYY-MM-DD'),  sessao.horario, sessao.horariofim, sessao.sala_id)
        //console.log('post  :', sessao_a_ter_horario_conferido.id,moment.utc(String(data)).format('YYYY-MM-DD'), horario, horariofim, sala_id)
        if (sessao.id != sessao_a_ter_horario_conferido.id &&
              moment.utc(String(sessao.data)).format('YYYY-MM-DD') == moment.utc(String(data)).format('YYYY-MM-DD') &&
                sessao.sala_id == sala_id &&
                  this.checkRangeIntervalHorario(sessao.horario, sessao.horariofim, horario, horariofim)){
                  //Se sala tiver mesmo horario que outra sessao enta nao esta disponivel 
                  
                  salaDisponivel = false
        }
 
      })

      console.log('salaDisponivel:',  salaDisponivel)
      return salaDisponivel
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
