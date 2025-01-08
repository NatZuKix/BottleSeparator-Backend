import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coupons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.boolean("is_activated").defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('expired_date').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}