import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Event from '#models/event'
export default class extends BaseSeeder {
  async run() {
    const events = [
      {title:"SIT IOT HACKATON 2025",description:"REDEEM T-SHIRT SIT IOT HACKATON 2025",is_showed:true,quantity:30,point_used:1},
      {title:"SIT HELLOWORD 2025",description:"REDEEM T-SHIRT SIT IOT HACKATON 2025",is_showed:true,quantity:22,point_used:1},
      {title:"SIT E-SPORT 2025",description:"REDEEM VALORANT SKIN",is_showed:true,quantity:1,point_used:3},
      {title:"SIT STARTER PACK 2025",description:"REDEEM HTML CODE",is_showed:true,quantity:10,point_used:20}
    ]

    await Event.createMany(events)
  }
}