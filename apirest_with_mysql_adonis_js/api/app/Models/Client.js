'use strict'

const Model = use('Model')

class Client extends Model {

  static get connection() {
    return 'oldMysql'
  }
  
  user () {
    return this.belongsTo('App/Models/User')
  }
  trainings() {
    return this.hasMany('App/Models/Training')
  }
}

module.exports = Client

