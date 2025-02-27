import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('oid',254).nullable().defaultTo(null)
      table.string('name').nullable()
      table.string('username', 254).notNullable().unique()
      table.string('password').notNullable()
      table.integer('credit').defaultTo(0)
      table.enum('role',['ADMIN','USER']).notNullable().defaultTo('USER')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}