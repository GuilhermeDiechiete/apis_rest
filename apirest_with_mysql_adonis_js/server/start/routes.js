'use strict'

const Route = use('Route')

Route.post('/sessions', 'SessionController.create')
Route.put('/sessions', 'SessionController.refreshToken')

Route.resource('users', 'UserController').apiOnly()
  .validator(new Map([
    [['users.store'], ['User']],
    [['users.update'], ['User']]
]))

Route.resource('clients', 'ClientController').apiOnly()
Route.resource('exercises', 'ExerciseController').apiOnly()
Route.resource('trainings', 'TrainingController').apiOnly()

// apiOnly é para definir apenas as rotas da api backend, retirando as do frontend






/*

// Route.get('/users', 'UserController.store') // forma comum de fazer as rotas


EXPLICAÇÃO DO RESOURCE

O Route.resource no AdonisJS gera automaticamente sete rotas RESTful para um recurso específico. Essas rotas correspondem às operações CRUD (Create, Read, Update, Delete) em um controlador associado ao recurso. Aqui estão as sete rotas que o Route.resource disponibiliza:

index:

Método HTTP: GET
Path: /resource
Controlador: ResourceController.index
Descrição: Obtém uma lista de todos os recursos.
create:

Método HTTP: GET
Path: /resource/create
Controlador: ResourceController.create
Descrição: Exibe um formulário para criar um novo recurso.
store:

Método HTTP: POST
Path: /resource
Controlador: ResourceController.store
Descrição: Armazena um novo recurso no banco de dados.
show:

Método HTTP: GET
Path: /resource/:id
Controlador: ResourceController.show
Descrição: Obtém detalhes de um recurso específico.
edit:

Método HTTP: GET
Path: /resource/:id/edit
Controlador: ResourceController.edit
Descrição: Exibe um formulário para editar um recurso específico.
update:

Método HTTP: PUT/PATCH
Path: /resource/:id
Controlador: ResourceController.update
Descrição: Atualiza um recurso específico no banco de dados.
destroy:

Método HTTP: DELETE
Path: /resource/:id
Controlador: ResourceController.destroy
Descrição: Remove um recurso específico do banco de dados.


Ao utilizar Route.resource, você pode simplificar a criação dessas rotas, economizando tempo e evitando a necessidade de definir manualmente cada uma delas. Certifique-se de substituir "Resource" pelo nome do seu recurso real e associar o controlador correto ao seu modelo. Isso ajuda a seguir as práticas RESTful de forma consistente em sua aplicação.
*/
