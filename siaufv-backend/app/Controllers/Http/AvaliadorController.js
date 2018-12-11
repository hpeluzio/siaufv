'use strict'

const Avaliador = use('App/Models/Avaliador')
const Database = use('Database')


class AvaliadorController {

  async index ({ request, response, view }) {
    //return await Avaliador.all()
    const avaliadors = 
      await Database
        .select('avaliadors.id as id', 
                'avaliadors.matricula', 
                'avaliadors.nome', 
                'avaliadors.curso', 
                'avaliadors.instituto', 
                'avaliadors.email', 
                'avaliadors.ano_id', 
                'anos.ano')
        .table('avaliadors')
        .innerJoin('anos', 'avaliadors.ano_id', 'anos.id')
    return avaliadors
  }

  async store ({ request, response }) {
    
    const { matricula, nome, curso, instituto, email, ano_id } = request.only([ 'matricula', 'nome', 'curso', 'instituto', 'email', 'ano_id' ]);
    //console.log(matricula, nome,curso, instituto, email, ano)
    try {
      await Avaliador.create({ matricula, nome, curso, instituto, email, ano_id })
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o avaliador foi adicionado com sucesso
    return response.status(200).send({ "success": "Avaliador registrado com sucesso" });
  }


  async update ({ params, request, response }) {
    const { matricula, nome, curso, instituto, email, ano_id } = request.only([ 'matricula', 'nome', 'curso', 'instituto', 'email', 'ano_id' ]);

    try {
      var avaliador = await Avaliador.findOrFail(params.id)
      avaliador.matricula = matricula
      avaliador.nome = nome
      avaliador.curso = curso
      avaliador.instituto = instituto
      avaliador.email = email
      avaliador.ano_id = ano_id
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
