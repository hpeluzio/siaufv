'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.create({ name: 'SIA', email: 'sia@ufv.br', password: '123123', permission: 'admin' })
    await User.create({ name: 'Henrique Peluzio', email: 'hpeluzio@gmail.com', password: '123123', permission: 'user' })
    await User.create({ name: 'Convidado', email: 'convidado@email.com', password: 'convidado', permission: 'user' })
  }
}

module.exports = UserSeeder
