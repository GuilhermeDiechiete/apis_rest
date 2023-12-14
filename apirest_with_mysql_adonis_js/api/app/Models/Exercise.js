'use strict'

const Model = use('Model')

class Exercise extends Model {
  trainings() {
    return this.belongsToMany('App/Models/Training')
  }
}

module.exports = Exercise
