import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description').nullable()
      table.integer('point_used').defaultTo(1)
      table.timestamp('created_at')
      
      table.timestamp('updated_at')
      table.timestamp('expired date')

      table.boolean('is_showed')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}