'use strict'

const Route = use('Route')




Route.post('/sessions', 'AuthController.create')
Route.put('/sessions', 'AuthController.refreshToken')



Route.resource('users', 'UserController').apiOnly().validator(new Map([
  [['users.store'], ['User']], [['users.update'], ['User']]
])).middleware(['auth:jwt', 'is:manager'])


Route.resource('clients', 'ClientController').apiOnly().middleware(['auth:jwt', 'is:manager'])

Route.resource('exercises', 'ExerciseController').apiOnly().middleware(['auth:jwt', 'can:gerenc_exercises', 'audit'])

Route.resource('trainings', 'TrainingController').apiOnly().middleware(['auth:jwt', 'can:gerenc_exercises', 'audit'])

Route.resource('permissions', 'PermissionController').apiOnly().middleware(['auth:jwt', 'is:manager'])

Route.resource('roles', 'RoleController').apiOnly().middleware(['auth:jwt', 'is:manager'])

Route.get('/products', 'ProductController.index').middleware(['auth:jwt'])


