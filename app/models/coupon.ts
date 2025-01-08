import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Event from './event.js'

export default class Coupon extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare event_id: number

  @column()
  declare is_activated: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare expired_date: DateTime

  @belongsTo(()=>User,{ foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>

  @belongsTo(()=>Event,{ foreignKey: 'event_id' })
  declare event: BelongsTo<typeof Event>
}