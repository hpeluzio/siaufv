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

            //Se chegou até aqui então o ano foi adicionado com sucesso
            return response.status(200).send({ "success": "Ano atualizado com sucesso" });            
        } catch (error) {
            console.log(error)
            return response.status(500).send({ "error": error });
        }

    }    

    async update ({ params, request, response }) {
        const { name, email, permission } = request.only([ 'name', 'email', 'permission' ]);
    
        try {
            var usuarioParaAtualizar = await User.findOrFail(params.id)
            usuarioParaAtualizar.name = name
            usuarioParaAtualizar.email = email
            usuarioParaAtualizar.permission = permission
            await usuarioParaAtualizar.save()

            //Se chegou até aqui então o ano foi adicionado com sucesso
            return response.status(200).send({ "success": "Ano atualizado com sucesso" });            
        } catch (error) {
            console.log(error)
            return response.status(500).send({ "error": error });
        }
    }    
    
}

module.exports = UserController
