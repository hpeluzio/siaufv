'use strict'



/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {  return { greeting: 'Hello world in JSON' }})

//Rotas Auth
Route.post('/register', 'Auth/AuthController.register').validator('UserRegister')
Route.post('/login', 'Auth/AuthController.login').validator('UserLogin')

//Rotas do Ano
Route.get('/ano', 'AnoController.index').middleware('auth:jwt')
Route.get('/getAnos', 'AnoController.getAnos').middleware('auth:jwt')

//Rotas do Avaliador
Route
    .resource('/avaliador', 'AvaliadorController')
    .apiOnly()
    .validator(new Map([
        [['store'], ['AvaliadorStore']],
        [['update'], ['AvaliadorUpdate']]
      ]))
    .middleware('auth:jwt')

//Rotas dos trabalhos
Route.get('/trabalho', 'TrabalhoController.index')//.middleware('auth:jwt')
Route.post('/trabalho', 'TrabalhoController.store').middleware('auth:jwt').validator('TrabalhoStore')
Route.put('/trabalho/:id', 'TrabalhoController.update').middleware('auth:jwt').validator('TrabalhoUpdate')
Route.delete('/trabalho/:id', 'TrabalhoController.destroy').middleware('auth:jwt')

Route.get('/get_autores/:trabalho_id', 'TrabalhoController.getAutores')

