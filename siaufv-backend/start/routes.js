'use strict'

//SIA ROUTES

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {  return { greeting: 'Hello world in JSON' }})

//Rotas Auth
Route.post('/register', 'Auth/AuthController.register').validator('UserRegister')
Route.post('/login', 'Auth/AuthController.login').validator('UserLogin')

//Usuarios
Route.get('/usuario', 'UserController.index').middleware('auth:jwt')
Route.put('/usuario_permission/:id', 'UserController.usuario_permission').middleware('auth:jwt').validator('UserPermissionUpdate')
Route.put('/usuario/:id', 'UserController.update').middleware('auth:jwt').validator('UserUpdate')

//Rotas do Instituto
Route.get('/instituto', 'InstitutoController.index').middleware('auth:jwt')
Route.post('/instituto', 'InstitutoController.store').middleware('auth:jwt').validator('InstitutoStore')
Route.delete('/instituto/:id', 'InstitutoController.destroy').middleware('auth:jwt')
Route.put('/instituto/:id', 'InstitutoController.update').middleware('auth:jwt').validator('InstitutoUpdate')

//Rotas do Ano
Route.get('/ano', 'AnoController.index').middleware('auth:jwt')
Route.post('/ano', 'AnoController.store').middleware('auth:jwt').validator('AnoStore')
Route.delete('/ano/:id', 'AnoController.destroy').middleware('auth:jwt')
Route.put('/ano/:id', 'AnoController.update').middleware('auth:jwt').validator('AnoUpdate')

//Rotas do Avaliador
Route.get('/avaliador', 'AvaliadorController.index').middleware('auth:jwt')
Route.get('/avaliador_ativo', 'AvaliadorController.avaliador_ativo').middleware('auth:jwt')
Route.post('/avaliador', 'AvaliadorController.store').middleware('auth:jwt').validator('AvaliadorStore')
Route.put('/avaliador/:id', 'AvaliadorController.update').middleware('auth:jwt').validator('AvaliadorUpdate')
Route.put('/avaliador_ativar/:id', 'AvaliadorController.avaliador_ativar').middleware('auth:jwt')
Route.delete('/avaliador/:id', 'AvaliadorController.destroy').middleware('auth:jwt')


//Rotas dos trabalhos
Route.get('/trabalho', 'TrabalhoController.index').middleware('auth:jwt')
Route.get('/trabalhos_nao_cadastrados', 'TrabalhoController.trabalhos_nao_cadastrados').middleware('auth:jwt')
Route.post('/trabalho', 'TrabalhoController.store').middleware('auth:jwt').validator('TrabalhoStore')
Route.put('/trabalho/:id', 'TrabalhoController.update').middleware('auth:jwt').validator('TrabalhoUpdate')
Route.delete('/trabalho/:id', 'TrabalhoController.destroy').middleware('auth:jwt')

//Rotas dos trabalhos autores
Route.get('/trabalhoautor', 'TrabalhoAutorController.index').middleware('auth:jwt')


//Rotas da Sala
Route.get('/sala', 'SalaController.index').middleware('auth:jwt')
Route.post('/sala', 'SalaController.store').middleware('auth:jwt').validator('SalaStore')
Route.delete('/sala/:id', 'SalaController.destroy').middleware('auth:jwt')
Route.put('/sala/:id', 'SalaController.update').middleware('auth:jwt').validator('SalaUpdate')

//Rotas das Avaliacoes
Route.get('/avaliacao', 'AvaliacaoController.index').middleware('auth:jwt')
Route.post('/avaliacao', 'AvaliacaoController.store').middleware('auth:jwt').validator('AvaliacaoStore')
Route.delete('/avaliacao/:id', 'AvaliacaoController.destroy').middleware('auth:jwt')

//Rotas das Secoes Orais
Route.get('/sessao', 'SessaoController.index').middleware('auth:jwt')
Route.post('/sessao', 'SessaoController.store').middleware('auth:jwt').validator('SessaoStore')
Route.put('/sessao/:id', 'SessaoController.update').middleware('auth:jwt').validator('SessaoUpdate')
Route.delete('/sessao/:id', 'SessaoController.destroy').middleware('auth:jwt')

//Reports
Route.get('/sessao_report', 'SessaoController.sessao_report').middleware('auth:jwt')

//Rotas do Avaliador Resource
// Route
//     .resource('/avaliador', 'AvaliadorController')
//     .apiOnly()
//     .validator(new Map([
//         [['store'], ['AvaliadorStore']],
//         [['update'], ['AvaliadorUpdate']]
//       ]))
//     .middleware('auth:jwt')