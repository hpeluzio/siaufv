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
          .select('users.id', 'users.username', 'users.email', 'users.created_at', 'users.updated_at')
          .table('users')

        return usuarios
    }    
    
}

module.exports = UserController
