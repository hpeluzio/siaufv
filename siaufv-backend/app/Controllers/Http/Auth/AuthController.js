'use strict'

const User = use('App/Models/User')

class AuthController {

    async register ( { request, response, auth}) {
        //Pegando os campos da requisicao
        const { name, email, password, confirm_password } = await request.only(['name','email','password', 'confirm_password'])
        //Try Catch para capturar possiveis erros e garantir 
        console.log(name, email, password, confirm_password)

        if (password !== confirm_password) {
              return response.status(400).send( { "error": "Senhas não conferem" } )
        }

        //Permission
        var permission = 'user'

        try {
            await User.create({ name, email, password, permission })
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

    async login ( { request, response, auth }) {
        //Pegando os campos da requisicao
        const { email, password } = await request.only( ['email','password'] )
        //Try Catch para capturar possiveis erros e garantir 
        try {
            const token = await auth.attempt(email, password)

            const user = await User.findByOrFail('email', email)
            user.password = undefined

            //Retornar o token e dados do usuario
            return { 'token': token, 'user':  user}
        } catch (err) {
            return response.status(401).send( { "error": "E-mail ou senha informados estão incorretos." } )
        }

    }

}

module.exports = AuthController
