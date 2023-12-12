
# API REST de Usuário

Esta é uma API REST de usuário que fornece operações CRUD completas para gerenciar usuários.
A API utiliza JWT para autenticação e autorização de usuários e Bcrypt para criptografar e comparar senhas de forma segura.

## Funcionalidades

Registro de Usuário: Permite o registro de novos usuários com nome, e-mail, telefone e senha. As senhas são criptografadas usando bcrypt antes de serem armazenadas no banco de dados.

Login de Usuário: Os usuários podem fazer login na aplicação com suas credenciais de e-mail e senha. A autenticação é feita utilizando JWT para gerar tokens de acesso seguros.

Perfil de Usuário: Os usuários autenticados têm acesso a um perfil onde podem visualizar e atualizar suas informações pessoais.

Listagem de Usuários: Os usuários com permissões de administrador podem listar todos os usuários registrados no sistema.

Atualização de Usuários: Os usuários com permissões de administrador podem atualizar as informações de outros usuários, incluindo nome, e-mail, telefone e permissões.

Atualização de senha de Usuário: O usuário pode alterar a sua senha, passando e-mail e senha atual, e adicionando a nova senha.

Exclusão de Usuários: Os usuários com permissão podem excluir usuários do sistema.

## Endpoints
POST /user/register: Registra um novo usuário com nome, e-mail, telefone e senha.

POST /user/login: Realiza o login do usuário com e-mail e senha, gerando um token JWT válido.

GET /user/list: Retorna todos os usuários cadastrados.

GET /user/user: Mostra um perfil do usuário.

PATCH /user/edit/:id: Atualiza as informações de um usuário específico ( senha, e-mail e telefone ).

PATCH /user/editpass/:id: Atualiza a senha do usuário.

DELETE /user/delete/:id: Exclui o usuário específico do sistema.

## Tecnologias Utilizadas

Node.js

Express.js

Dotenv

Body-Parser

Cors

MongoDB

Mongoose

Joi para conferir dados das requisições

JWT (JSON Web Token) para autenticação

Bcrypt para criptografia de senhas
