'use strict'

const Database = use('Database')
const Trabalho = use('App/Models/Trabalho')
const TrabalhoAutor = use('App/Models/TrabalhoAutor')


class TrabalhoController {

  async index ({ request, response, view }) {
    const trabalhos = 
      await Database
        .select('trabalhos.*', 'anos.ano as ano')
        .table('trabalhos')
        .innerJoin('anos', 'trabalhos.ano_id', 'anos.id')

    for(let index in trabalhos){  
      trabalhos[index].autores = 
      await Database
        .select('*')
        .table('trabalho_autores')
        .where('trabalho_autores.trabalho_id', '=', trabalhos[index].trabalho_id )
    }

    for(let trabalho of trabalhos){  
      trabalho.sessao = 
      await Database
        .select('*')
        .from('sessoes')
        .innerJoin('avaliacoes', function () {
            this
              .on('sessoes.id', 'avaliacoes.sessao_id')
              .andOn('avaliacoes.trabalho_id', trabalho.trabalho_id)
          })
    }

    return trabalhos 
  }

  async trabalhos_nao_cadastrados ({ request, response, view }) {

    var avaliacoes = await Database
      .select('avaliacoes.trabalho_id')
      .table('avaliacoes')
    
    avaliacoes = avaliacoes.map( item => {
      return item.trabalho_id
    })

    //return avaliacoes

    const trabalhos = 
      await Database
        .select('trabalhos.*', 'anos.ano as ano')
        .table('trabalhos')
        .innerJoin('anos', 'trabalhos.ano_id', 'anos.id')
        .whereNotIn('trabalho_id', avaliacoes)

    for(let index in trabalhos){  
      trabalhos[index].autores = 
      await Database
        .select('*')
        .table('trabalho_autores')
        .where('trabalho_autores.trabalho_id', '=', trabalhos[index].trabalho_id )
    }    

    return trabalhos 
  }

  async store ({ request, response }) {
    const { trabalho_id, nome, autores, orientador, modalidade, area, ano_id, instituto } = 
      request.only([ 'trabalho_id', 'nome', 'autores','orientador', 'modalidade', 'area', 'ano_id', 'instituto' ]);
    
    try {
      await Trabalho.create({ trabalho_id, nome, orientador, modalidade, area, ano_id, instituto })
      for(var i=0; i < autores.length; i++){
        await TrabalhoAutor.create({ 'trabalho_id': trabalho_id, 'autor': autores[i].autor })
      }  
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Trabalho registrado com sucesso" });
  }

  async update ({ params, request, response }) {
    const { id, trabalho_id, nome, autores, deletedAutores, orientador, modalidade, area, ano_id, instituto } = 
      request.only([ 'id', 'trabalho_id', 'nome', 'autores', 'deletedAutores', 'orientador', 'modalidade', 'area', 'ano_id', 'instituto' ]);
    
    try {
      //Update de trabalhos
      var trabalho = await Trabalho.findOrFail(id)
      trabalho.trabalho_id = trabalho_id
      trabalho.nome = nome
      trabalho.orientador = orientador
      trabalho.modalidade = modalidade
      trabalho.area = area
      trabalho.ano_id = ano_id
      trabalho.instituto = instituto
      await trabalho.save()

      //Update de autores dos trabalhos
        //Inserts
      if(typeof autores !== 'undefined' &&  autores.length > 0){
        for(var i=0; i < autores.length; i++){
          
          if(!autores[i].id || autores[i].id === 'undefined'){
            await TrabalhoAutor.create({ 'trabalho_id': trabalho_id, 'autor': autores[i].autor })
          } else {
            var trabalho_autor = await TrabalhoAutor.findOrFail(autores[i].id)
            trabalho_autor.autor = autores[i].autor
            trabalho_autor.save()           
          }
        }
      }
        //Deletes
      if (typeof deletedAutores !== 'undefined' && deletedAutores.length > 0) {
        for(var i=0; i < deletedAutores.length; i++){
          if(deletedAutores[i].id){
            var trabalho_autor = await TrabalhoAutor.findOrFail(deletedAutores[i].id)
            await trabalho_autor.delete()
          }
        }
      }
      //Fim Deletes  
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Trabalho registrado com sucesso" });
  }

  async destroy ({ params, request, response }) {
    try {
      var trabalho = await Trabalho.findOrFail(params.id)
      await trabalho.delete()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o Trabalho foi adicionado com sucesso
    return response.status(200).send({ "success": "Trabalho deletado com sucesso" });
  }

  async trabalhos_por_instituto ({ request, response, view }) {
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


    for(let index in trabalhos){  
      trabalhos[index].autores = 
      await Database
        .select('*')
        .table('trabalho_autores')
        .where('trabalho_autores.trabalho_id', '=', trabalhos[index].trabalho_id )
    }

    for(let index in trabalhos){  
      trabalhos[index].avaliadores = 
        await Database
        .select('avaliadores.*')
        .from('avaliadores')
        .innerJoin('avaliador_avaliacao', 'avaliador_avaliacao.avaliador_id', 'avaliadores.id')
        .innerJoin('avaliacoes', 'avaliador_avaliacao.avaliacao_id', 'avaliacoes.id')
        .innerJoin('trabalhos', 'trabalhos.trabalho_id', 'avaliacoes.trabalho_id')
        .where('trabalhos.trabalho_id', '=', trabalhos[index].trabalho_id)
    }    



    return trabalhos 
  }

}

module.exports = TrabalhoController
