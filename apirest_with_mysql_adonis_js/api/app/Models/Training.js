'use strict'

const Model = use('Model')

class Training extends Model {
  exercises() {
    return this.belongsToMany('App/Models/Exercise')
  }
}

module.exports = Training
