'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index() {
    return await Product.all()
  }
}

module.exports = ProductController
