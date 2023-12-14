'use strict'

const Schema = use('Schema')

class ExerciseSchema extends Schema {
  up () {
    this.create('exercises', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.string('observation', 200)
      table.integer('series', 50)
      table.integer('waiting_time')
      table.string('url_image', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('exercises')
  }
}

module.exports = ExerciseSchema
