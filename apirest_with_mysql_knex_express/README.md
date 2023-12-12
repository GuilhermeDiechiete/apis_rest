# API REST de Usuário

Esta é uma API REST de usuário que fornece operações CRUD completas para gerenciamento de usuários.
A API utiliza JWT para autenticação e autorização de usuários e Bcrypt para criptografar e comparar senhas de forma segura.

## Funcionalidades

Registro de Usuário: Permite o registro de novos usuários com nome, e-mail, idade, telefone e senha. As senhas são criptografadas usando bcrypt antes de serem armazenadas no banco de dados.

Login de Usuário: Os usuários podem fazer login na aplicação com suas credenciais de e-mail e senha. A autenticação é feita utilizando JWT para gerar tokens de acesso seguros.

Perfil de Usuário: Os usuários autenticados têm acesso a um perfil onde podem visualizar e atualizar suas informações pessoais.

Listagem de Usuários: Os usuários com permissões de administrador podem listar todos os usuários registrados no sistema.

Atualização de senha de Usuário: O usuário autenticado, pode alterar a sua senha, passando e-mail, senha atual e a nova senha.

Exclusão de Usuários: Os usuários com permissão podem excluir usuários do sistema.

## Endpoints
POST /users/register: Registra um novo usuário com nome, e-mail, telefone e senha.

POST /users/login: Realiza o login do usuário com e-mail e senha, gerando um token JWT válido.

GET /users/list/:id: Retorna todos os usuários cadastrados.

GET /users/:id: Mostra um perfil do usuário.

PATCH /users/:id: Atualiza as informações de um usuário específico ( senha, e-mail e telefone ).

PATCH /users/pass/:id: Atualiza a senha do usuário.

DELETE /users/:id: Exclui o usuário específico do sistema.

## Tecnologias Utilizadas

Node.js

Express.js

Dotenv

Body-Parser

Cors

Knex

Mysql2

JWT (JSON Web Token) para autenticação

Bcrypt para criptografia de senhas

## Design Pattern

/src/routes -> responsavel pelo roteamento das rotas.

/src/controllers -> responsavel de pegar a requisição e devolver a resposta ao usuário.

/src/handlings -> responsavel por manipular os dados, validações, consultas no banco e formar a resposta para os controllers.

/src/fragments -> responsavel por conter os arquivos necessarios para os handlings, como arquivos de criptografica, criação de token...

/src/database/access -> responsavel por conter todos os acessos ao banco de dados.

O padrão de projeto foi desenvolvido com o objetivo de maior organização possivel, ao ler o projeto, você vai notar que:

/src/controllers, existe somente duas linhas principais responsaveis por cada rota, uma pegando a requisição e desviando para os handlings, para efetuar a manipulação de dados e a outra linha recebendo a resposta dos handlings.

/src/handlings, é o unico diretorio de todo o projeto, que tem acesso e faz utilização do banco de dados e de arquivos de validações, criptografia, etc...

/src/fragments, existe somente arquivos que executam alguma manipulação de codigo, gosto de referenciar os handlings como um 'mecanico' e os fragments, como 'a maleta de ferramentas'.

/src/database/acceess, é o unico diretorio do projeto que tem permissão para acessar o banco de dados, contem somente a parte de CRUD, criar usuarios, buscar informações, fazer edição e deleção de usuarios.