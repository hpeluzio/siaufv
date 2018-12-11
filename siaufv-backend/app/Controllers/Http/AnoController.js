'use strict'

const Ano = use('App/Models/Ano')


class AnoController {

  async index ({ request, response, view }) {
    return await Ano.all()
  }


  async store ({ request, response }) {
    const { ano } = request.only([ 'ano' ]);

    try {
      await Ano.create({ ano })
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o ano foi adicionado com sucesso
    return response.status(200).send({ "success": "Ano registrado com sucesso" });
  }

  async update ({ params, request, response }) {
    const { ano } = request.only([ 'ano' ]);

    try {
      var anoParaAtualizar = await Ano.findOrFail(params.id)
      anoParaAtualizar.ano = ano
      await anoParaAtualizar.save()
    } catch (error) {
      console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o ano foi adicionado com sucesso
    return response.status(200).send({ "success": "Ano atualizado com sucesso" });
  }

  async destroy ({ params, request, response }) {
    try {
      console.log('ANTES')
      console.log(params.id)

      var ano = await Ano.findOrFail(params.id)
      await ano.delete() 
    } catch (error) {
      //console.log(error)
      return response.status(500).send({ "error": error });
    }
    //Se chegou até aqui então o ano foi adicionado com sucesso
    return response.status(200).send({ "success": "Ano deletado com sucesso" });
  }
}

module.exports = AnoController
