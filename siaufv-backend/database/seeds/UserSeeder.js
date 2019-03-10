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
    await User.create({ username: 'sia', email: 'sia@ufv.br', password: '123123' })
    await User.create({ username: 'hpeluzio', email: 'hpeluzio@gmail.com', password: '123123' })
    await User.create({ username: 'convidado', email: 'convidado@email.com', password: 'convidado' })
  }
}

module.exports = UserSeeder
