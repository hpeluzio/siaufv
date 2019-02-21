'use strict'

//SIA ROUTES

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {  return { greeting: 'Hello world in JSON' }})

//Rotas Auth
Route.post('/register', 'Auth/AuthController.register').validator('UserRegister')
Route.post('/login', 'Auth/AuthController.login').validator('UserLogin')

//Rotas do Ano
Route.get('/ano', 'AnoController.index').middleware('auth:jwt')
Route.post('/ano', 'AnoController.store').middleware('auth:jwt').validator('AnoStore')
Route.delete('/ano/:id', 'AnoController.destroy').middleware('auth:jwt')
Route.put('/ano/:id', 'AnoController.update').middleware('auth:jwt').validator('AnoUpdate')

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
Route.get('/trabalho', 'TrabalhoController.index').middleware('auth:jwt')
Route.post('/trabalho', 'TrabalhoController.store').middleware('auth:jwt').validator('TrabalhoStore')
Route.put('/trabalho/:id', 'TrabalhoController.update').middleware('auth:jwt').validator('TrabalhoUpdate')
Route.delete('/trabalho/:id', 'TrabalhoController.destroy').middleware('auth:jwt')


//Rotas da Sala
Route.get('/sala', 'SalaController.index').middleware('auth:jwt')
Route.post('/sala', 'SalaController.store').middleware('auth:jwt').validator('SalaStore')
Route.delete('/sala/:id', 'SalaController.destroy').middleware('auth:jwt')
Route.put('/sala/:id', 'SalaController.update').middleware('auth:jwt').validator('SalaUpdate')

//Rotas das Avaliacoes Orais
Route.get('/avaliacao', 'AvaliacaoController.index').middleware('auth:jwt')
Route.post('/avaliacao', 'AvaliacaoController.store').middleware('auth:jwt').validator('AvaliacaoStore')
Route.put('/avaliacao/:id', 'AvaliacaoController.update').middleware('auth:jwt')//.validator('AvaliacaoUpdate')

//Rotas do Avaliador Resource
// Route
//     .resource('/avaliador', 'AvaliadorController')
//     .apiOnly()
//     .validator(new Map([
//         [['store'], ['AvaliadorStore']],
//         [['update'], ['AvaliadorUpdate']]
//       ]))
//     .middleware('auth:jwt')