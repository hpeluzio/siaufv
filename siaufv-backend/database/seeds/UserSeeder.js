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
const Hash = use('Hash')

class UserSeeder {
  async run () {
    await User.create({ username: 'admin', email: 'admin@admin.com', password: '123123' })
    await User.create({ username: 'hpeluzio', email: 'hpeluzio@GMAIL.COM', password: '123123' })
    await User.create({ username: 'h1', email: 'h1@email.com', password: Hash.make('123123') })
    await User.create({ username: 'teste', email: 'teste@email.com', password: Hash.make('secret') })
    //console.log(users)
  }
}

module.exports = UserSeeder
