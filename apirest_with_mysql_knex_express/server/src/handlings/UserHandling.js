const V = require('../fragments/validators');
const encrypt = require('../fragments/encrypt');
const db = require('../database/access/UserAccess');
const token = require('../fragments/token');

module.exports = class UserHandling {
  static async userRegister(req) {
    const user = { ...req.body };

    try {
      V.check(user.name, 'nome').notNull().string();
      V.check(user.email, 'e-mail').notNull().email();
      V.check(user.age, 'idade').notNull().age();
      V.check(user.phone, 'telefone').notNull().phone();
      V.check(user.password, 'senha').notNull();
      V.check(user.confirmpassword, 'confirmação de senha').notNull();
      V.check(user.password, 'senha').eguals(user.confirmpassword, 'confirmação de senha');

      const emailExists = await db.getEmail(user.email);
      V.check(emailExists, 'e-mail').existsMsg('O e-mail já está em uso.');

      const hashPassword = await encrypt.hashPassword(user.password);
      V.check(hashPassword, 'senha').notNullMsg('Erro ao criar senha');
      user.password = hashPassword;
      delete user.confirmpassword;

      await db.create(user);

      return { status: 200, message: 'Usuário criado com sucesso!' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async userLogin(req) {
    const user = { ...req.body };

    try {
      V.check(user.email, 'e-mail').notNull().email();
      V.check(user.password, 'senha').notNull().minLength(5);

      const existEmail = await db.getEmail(user.email);
      V.check(existEmail, 'e-mail').invalidMsg('E-mail invalido.');

      const pass = await db.getPasswordByEmail(user.email);
      const checkPassword = await encrypt.comparePasswords(user.password, pass.password);
      V.check(checkPassword, 'senha').invalidMsg('Senha Invalida');

      const userDB = await db.getUserByEmail(user.email);

      const tk = await token.createUserToken(userDB, req);
      V.check(tk, 'token').notNullMsg('Erro ao criar token');
      return { status: 200, message: 'Usuário logado com sucesso!', token: tk };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async userList(req) {
    try {
      const users = await db.getUsers();
      return { status: 200, message: users };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async getUser(req) {
    const { id } = req.params;

    try {
      V.check(id, 'Usuário').notNullMsg('Usuário não encontrado');

      const user = await db.getUserById(id);
      V.check(user, 'Usuário').notNullMsg('Usuário não foi encontrado.');

      return { status: 200, message: user };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async userEdit(req) {
    const { id } = req.params;
    const user = { ...req.body };
    try {
      const userAccess = await db.getUserById(id);

      V.check(userAccess, 'Usuário').invalidMsg('Usuário não encontrado');
      V.check(user.name, 'nome').notNull().string();
      V.check(user.email, 'e-mail').notNull().email();
      V.check(user.age, 'idade').notNull().age();
      V.check(user.phone, 'telefone').notNull().phone();

      const emailExists = await db.getEmail(user.email);
      V.check(emailExists, 'e-mail').exists();

      if (emailExists && emailExists.email === userAccess.email) {
        user.email = userAccess.email;
      } else if (emailExists && emailExists.email !== userAccess.email) {
        V.check(emailExists, 'e-mail').existsMsg('O e-mail já está em uso.');
      }
      const update = await db.updateUser(id, user);
      return { status: 200, message: update };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async userEditPass(req) {
    const { id } = req.params;
    const user = { ...req.body };
    try {
      V.check(user.email, 'e-mail').notNull().email();
      V.check(user.password, 'senha atual').notNull();
      V.check(user.newPassword, 'senha atual').notNull();
      V.check(user.newConfirmPassword, 'senha atual').notNull();
      V.check(user.newPassword, ' nova senha').eguals(user.newConfirmPassword, 'confirmação de senha');

      const data = await db.getUserFullById(id);
      const checkPassword = await encrypt.comparePasswords(user.password, data.password);

      V.check(user.email).egualsMsg(data.email, 'E-mail invalido');
      V.check(checkPassword).invalidMsg('Senha atual é invalida!');

      const hashPassword = await encrypt.hashPassword(user.newPassword);

      const update = await db.updatePass(id, hashPassword);
      V.check(update, 'Atualização').invalidMsg('Erro em atualizar senha.');

      return { status: 200, message: 'Senha atualizada com sucesso' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async userDelete(req) {
    const { id } = req.params;
    try {
      V.check(id).notNullMsg('Usuário não identificado');

      const user = await db.getUserById(id);
      V.check(user).notNullMsg('Usuário não encontrado');

      await db.deleteUserById(id);
      return { status: 200, message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
};
