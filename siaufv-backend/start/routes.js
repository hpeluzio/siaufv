'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {  return { greeting: 'Hello world in JSON' }})

//Rotas Auth
Route.post('/register', 'Auth/AuthController.register').validator('UserRegister')
Route.post('/login', 'Auth/AuthController.login').validator('UserLogin')
//
Route.get('/ano', 'AnoController.index')//.middleware('auth:user')

//Rotas do Avaliador
Route
    .resource('/avaliador', 'AvaliadorController')
    .apiOnly()
    .validator(new Map([
        [['store'], ['AvaliadorStore']],
        //[['update'], ['AvaliadorUpdate']]
      ]))//.middleware('auth:user')


