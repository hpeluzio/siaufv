'use strict'

const User = use('App/Models/User');

class UserController {

    async rotateste ( { request, response }) {
        //console.log(request.body);
        return response.status(200).send( { success: 'Rotateste' } );
    }
}

module.exports = UserController
