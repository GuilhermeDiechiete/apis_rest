const User = require('../database/entities/User');
const V = require('../fragments/validators');
const encrypt = require('../fragments/encrypt');
const token = require('../fragments/token');

module.exports = class UserServices {
  static async createUser(req) {
    const user = { ...req.body };

    try {
      V.check(user.name, 'nome').notNull();
      V.check(user.email, 'e-mail').notNull().email();
      V.check(user.phone, 'telefone').notNull().phone();
      V.check(user.password, 'senha').notNull().min(5);
      V.check(user.confirmpassword, 'confirmação de senha').notNull().min(5);
      V.check(user.password, 'senha').eguals(user.confirmpassword, 'confirmação de senha');

      const userExists = await User.findOne({ email: user.email });
      V.check(userExists, 'e-mail').exists();

      const passwordHash = await encrypt.hashPassword(user.password);
      V.check(passwordHash, 'senha').notExists();

      const newUser = new User({
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: passwordHash,
      });
      await newUser.save();

      return { status: 200, message: 'Usuário cadastrado com sucesso.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async loginUser(req) {
    const { email, password } = req.body;

    try {
      V.check(email, 'e-mail').notNull().email();
      V.check(password, 'senha').notNull().min(5);

      const user = await User.findOne({ email });
      V.check(user, 'usuário').notExists();

      const checkpassword = await encrypt.comparePasswords(password, user.password);
      V.check(checkpassword, 'Senha').invalid();

      const tk = await token.createUserToken(user, req);
      V.check(tk, 'token').invalid();

      return { status: 200, message: 'Login efetuado com sucesso.', token: tk };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async listUsers(req) {
    try {
      const users = await User.find({}, '-password').sort('-createdAt');
      return { status: 200, message: users };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async getByEmailUser(req) {
    const { email } = req.body;
    try {
      V.check(email, 'e-mail').notNull();

      const user = await User.findOne({ email }, '-password');
      V.check(user, 'usuário').notExists();

      return { status: 200, message: user };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async deleteUser(req) {
    const { id } = req.params;
    try {
      V.check(id, 'Usuário').invalid();
      const user = await User.findOne({ _id: id });
      V.check(user, 'usuário').notExists();
      await User.findOneAndRemove({ _id: id });
      return { status: 200, message: 'Usuário deletado.'};
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async updateUser(req) {
    const { id } = req.params;
    const user = { ...req.body };

    try {
      V.check(id, 'Usuário').notNull();
      V.check(user.name, 'nome').notNull();
      V.check(user.email, 'e-mail').notNull();
      V.check(user.phone, 'telefone').notNull();
      user.id = id;

      const userDB = await User.findOne({ _id: id });
      V.check(userDB, 'usuário').notExists();

      if (userDB && userDB.email === user.email) {
        user.email = userDB.email;
      } else if (userDB && userDB.email !== user.email) {
        V.check(user.email, 'e-mail').msg('E-mail já está em uso');
      }
      await User.findByIdAndUpdate({ _id: user.id }, { $set: user }, { new: true });

      return { status: 200, message: 'Usuário atualizado.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  static async editPasswordUser(req) {
    const { id } = req.params.id;
    const user = { ...req.body };

    try {
      V.check(user.email, 'e-mail').notNull();
      V.check(user.password, 'senha').notNull();
      V.check(user.newpassword, 'nova senha').notNull();
      V.check(user.newconfirmpassword, 'confirmação de senha').notNull();
      V.check(user.newpassword, 'nova senha').eguals(user.newconfirmpassword, 'confirmação de senha');

      const userDB = await User.findOne({ _id: id });
      console.log(userDB)
      V.check(userDB, 'usuário').notExists();

      const checkPassword = await encrypt.comparePasswords(user.password, userDB.password);
      V.check(checkPassword, 'senha').invalid();

      const hashPassword = await encrypt.hashPassword(user.newpassword);
      user.password = hashPassword;

      await User.findByIdAndUpdate({ _id: user.id }, { $set: user }, { new: true });
      return { status: 200, message: 'Senha atualizada' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
};
