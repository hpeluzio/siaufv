'use strict'

const Database = use('Database')
const User = use('App/Models/User');

class UserController {

    async rotateste ( { request, response }) {
        //console.log(request.body);
        return response.status(200).send( { success: 'Rotateste' } );
    }

    async index ( { request, response }) {
        //console.log(request.body);
        const usuarios = 
        await Database
          .select('users.id', 'users.name', 'users.email', 'users.permission', 'users.created_at', 'users.updated_at')
          .table('users')

        return usuarios
    }    

    async usuario_permission ({ auth, params, request, response }) {

        const { permission } = request.only([ 'permission' ]);

        try {
            var usuarioParaAtualizar = await User.findOrFail(params.id)
            usuarioParaAtualizar.permission = permission
            await usuarioParaAtualizar.save()

            //Se chegou até aqui então o Usuario foi adicionado com sucesso
            return response.status(200).send({ "success": "Usuario atualizado com sucesso" });            
        } catch (error) {
            console.log(error)
            return response.status(500).send({ "error": error });
        }

    }    

    async update ({ auth, params, request, response }) {
        
        if(auth.user.id != params.id)
            return response.unauthorized('Not authorized')

        //Pegando os campos da requisicao
        const { name, email, password, confirm_password } = await request.only(['name','email','password', 'confirm_password'])
        //Try Catch para capturar possiveis erros e garantir 
        console.log(name, email, password, confirm_password)

        if (password !== confirm_password) {
              return response.status(400).send( { "error": "Senhas não conferem" } )
        }


        try {
            var usuarioParaAtualizar = await User.findOrFail(auth.user.id)
            usuarioParaAtualizar.name = name
            usuarioParaAtualizar.email = email
            usuarioParaAtualizar.password = password
            await usuarioParaAtualizar.save()

            const token = await auth.attempt(email, password)

            const user = await User.findByOrFail('email', email)
            user.password = undefined

            //Retornar o token e dados do usuario
            return { 'token': token, 'user':  user }
        } catch (err) {
            console.log(err)
            return response.status(500).send( { "error": err } )
        }
    }    

    async destroy ({ params, request, response }) {
        try {
          var usuarioParaSerDeletado = await User.findOrFail(params.id)
          await usuarioParaSerDeletado.delete()
        } catch (error) {
          console.log(error)
          return response.status(500).send({ "error": error });
        }
        //Se chegou até aqui então o Trabalho foi adicionado com sucesso
        return response.status(200).send({ "success": "Usuário deletado com sucesso" });
      }

}

module.exports = UserController
