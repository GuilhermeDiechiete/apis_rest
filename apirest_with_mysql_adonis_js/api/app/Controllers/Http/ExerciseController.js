'use strict'

const Exercise = use('App/Models/Exercise')

class ExerciseController {
  async index({ request }) {
    console.log(request.all())
    return await Exercise.all()
  }
  async show({ params }) {
    const exercise = await Exercise.findOrFail(params.id)
    return exercise
  }
  async store({ request }) {
    const data = request.only(['name', 'observation', 'series', 'waiting_time'])
    console.log(request.input('action_by'))
    const exercise = await Exercise.create(data)
    return exercise
  }
  async update({ params, request }) {
    const data = request.only(['name', 'observation', 'series', 'waiting_time'])
    const exercise = await Exercise.findOrFail(params.id)
    exercise.merge(data)
    await exercise.save()
    return exercise
  }
  async destroy({ params }) {
    const exercise = await Exercise.findOrFail(params.id)
    return exercise.delete()
  }
}

module.exports = ExerciseController
