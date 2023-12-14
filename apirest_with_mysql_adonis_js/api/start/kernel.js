'use strict'

/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use('Server')

// qualquer rota executa esses middlewares
const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'App/Middleware/ConvertEmptyStringsToNull',
  'Adonis/Acl/Init'
]

// nomear os middlewares, só vai executar nas rotas que forem definidos
const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
  guest: 'Adonis/Middleware/AllowGuestOnly',
  is: 'Adonis/Acl/Is',
  can: 'Adonis/Acl/Can',
  audit: 'App/Middleware/Audit'
}

// somente para dados estaticos
const serverMiddleware = [
  'Adonis/Middleware/Cors'
]

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware)
