import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import Trash_Type from '../../Enums/Trash_Type.js'

export default class TrashRecord extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare trash_type: Trash_Type

  @column()
  declare redeem_code: string

  @column()
  declare is_redeemed: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}