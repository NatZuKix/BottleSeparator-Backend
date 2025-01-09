import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../Enums/Roles.js'
import User from '#models/user'
export default class extends BaseSeeder {
  async run() {

    const users = [
      { username: "nutnon",name:"Nutthanon Thangjintawiwat", password: 'nutnon', oid: "fd89ff56-e84a-4e2f-a8d3-2800376cacb1", role: Role.USER,credit:10 },
      { username: "nutnon64", name:"Nutthanon Thangjintawiwat(64)",password: 'nutnon64', oid: "89f3646a-181a-4359-b20b-40f6e5ad8df1", role: Role.USER , credit:10},
      { username: 'btadmin1',name: 'Admin_1',oid:null,password: 'btadmin1',role: Role.ADMIN}
    ]

    await User.createMany(users)
  }
}