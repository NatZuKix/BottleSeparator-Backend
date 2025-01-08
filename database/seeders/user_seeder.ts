import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../Enums/Roles.js'
import User from '#models/user'
export default class extends BaseSeeder {
  async run() {
    
    await User.create({
      username: 'btadmin1',
      name: 'Admin_1',
      oid:null,
      password: 'btadmin1',
      role: Role.ADMIN
    })
  }
}