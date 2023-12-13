'use strict'

const Route = use('Route')




Route.post('/sessions', 'AuthController.create')
Route.put('/sessions', 'AuthController.refreshToken')



Route.resource('users', 'UserController').apiOnly().validator(new Map([
  [['users.store'], ['User']], [['users.update'], ['User']]
])).middleware('auth:jwt')


Route.resource('clients', 'ClientController').apiOnly().middleware('auth:jwt')
Route.resource('exercises', 'ExerciseController').apiOnly().middleware('auth:jwt')
Route.resource('trainings', 'TrainingController').apiOnly().middleware('auth:jwt')

Route.resource('permissions', 'PermissionController').apiOnly().middleware('auth:jwt')
Route.resource('roles', 'RoleController').apiOnly().middleware('auth:jwt')


