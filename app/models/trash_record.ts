import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TrashRecord extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // @column(default:null)
  // declare user_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}