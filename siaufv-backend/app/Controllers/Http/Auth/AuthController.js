'use strict'

const User = use('App/Models/User')

class AuthController {

    async register ( { request, response, auth}) {
        //Pegando os campos da requisicao
          const { username, email, password, confirm_password } = await request.only(['username','email','password', 'confirm_password'])
        //Try Catch para capturar possiveis erros e garantir 
        console.log(username, email, password, confirm_password)

        if (password !== confirm_password) {
              return response.status(400).send( { "error": "Senhas não conferem" } )
        }

        try {
            await User.create({ username, email, password })
            const token = await auth.attempt(email, password)
            return token
        } catch (err) {
            console.log(err)
            return response.status(500).send( { "error": err } )
        }

    }

    async login ( { request, response, auth }) {
        //Pegando os campos da requisicao
        const { email, password } = await request.only( ['email','password'] )
        //Try Catch para capturar possiveis erros e garantir 
        try {
            console.log(email, password)
            const token = await auth.attempt(email, password)
            //const user = await User.query().where('email','=', email)
            const user = await User.findByOrFail('email', email)
            user.password = undefined
            //console.log(user)
            console.log("AuthController - login")
            //console.log(token);
            
            //token.
            return { 'tokenData': token, 'userData':  user}
        } catch (err) {
            return response.status(401).send( { "error": "E-mail ou senha informados estão incorretos." } )
        }

    }

}

module.exports = AuthController
