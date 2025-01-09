import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Trash_Type from '../../Enums/Trash_Type.js'

import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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
  declare is_redeemed: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(()=>User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>
}