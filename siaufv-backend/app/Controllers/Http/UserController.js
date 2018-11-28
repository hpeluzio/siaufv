'use strict'

const User = use('App/Models/User');

class UserController {

    
    async rotateste ( { request, response }) {
        console.log(request.body);
        return response.status(200).send( { eita: 'EIIOIA' } );
    }

    async register ( { request, response, auth}) {
        //Pegando os campos da requisicao
        const { username, email, password } = await request.only(['username','email','password'])
        //Try Catch para capturar possiveis erros e garantir 
        try {
            await User.create({ username, email, password })
            const token = await auth.attempt(email, password);
            return token;
        } catch (err) {
            return response.status(500).send( { "error": err } );
        }

    }

    async login ( { request, auth }) {
        //Pegando os campos da requisicao
        const { email, password } = await request.only( ['email','password'] )

        //Try Catch para capturar possiveis erros e garantir 
        try {
            const token = await auth.attempt(email, password);
            return token;
        } catch (err) {
            return response.status(500).send( { "error": err } );
        }

    }

}

module.exports = UserController
