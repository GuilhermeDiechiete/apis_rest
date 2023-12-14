'use strict'

const Model = use('Model')

class Product extends Model {
  static get connection() {
    return 'oldMysql'
  }
  static get table() {
    return 'produtos'
  }
}

module.exports = Product
