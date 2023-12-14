'use strict'

const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  'adonis-acl/providers/AclProvider',
  '@adonisjs/antl/providers/AntlProvider'
]

const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-acl/providers/CommandsProvider'
]

const aliases = {
  Role: 'Adonis/Acl/Role', // para nao ficar definindo todo o caminho
  Permission: 'Adonis/Acl/Permission'
}

const commands = []

module.exports = { providers, aceProviders, aliases, commands }
