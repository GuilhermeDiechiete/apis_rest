'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {

  static get connection() {
    return 'oldMysql'
  }

  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 60).notNullable()
      table.decimal('value', [2, 10]).notNullable()
      table.integer('quantity').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
