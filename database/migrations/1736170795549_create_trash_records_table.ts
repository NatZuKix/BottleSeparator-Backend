import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trash_records'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').defaultTo(null).nullable()
      table.string("trash_type").notNullable()
      table.string("redeem_code",6).notNullable()
      table.boolean("is_redeemed").notNullable().defaultTo(false)
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}