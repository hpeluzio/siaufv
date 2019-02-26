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
}

module.exports = AvaliadorController
