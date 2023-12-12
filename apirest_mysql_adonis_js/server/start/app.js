'use strict'

/*
  PROVIDERS -   são módulos que ajudam na configuração e inicialização de diversos recursos em sua aplicação.
  Eles são uma parte importante do ciclo de vida da aplicação e são usados para fornecer funcionalidades adicionais,
  como configurações de banco de dados, autenticação, middleware, etc.
  Os providers ajudam a organizar o código e fornecer uma maneira limpa de estender e personalizar o comportamento da aplicação. */

const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/validator/providers/ValidatorProvider'
]

/*
  ACE PROVIDERS
  Ace providers são usados para estender a funcionalidade da CLI (Command-Line Interface).
  Eles ajudam na criação de comandos personalizados para serem executados via terminal. */
  
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider'
]

const aliases = {}


const commands = []

module.exports = { providers, aceProviders, aliases, commands }
