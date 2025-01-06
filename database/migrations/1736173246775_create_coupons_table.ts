import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coupons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.boolean("is_used")
      table.timestamp('created_at')
      table.timestamp('expired date')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}