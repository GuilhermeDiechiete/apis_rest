const UserServices = require('../services/UserServices');

module.exports = class UserController {
  static async register(req, res) {
    try {
      const result = await UserServices.createUser(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async login(req, res) {
    try {
      const result = await UserServices.loginUser(req);
      res.status(result.status).json({ message: result.message, token: result.token });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor', error });
    }
  }

  static async list(req, res) {
    try {
      const result = await UserServices.listUsers(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async getByEmail(req, res) {
    try {
      const result = await UserServices.getByEmailUser(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async delete(req, res) {
    try {
      const result = await UserServices.deleteUser(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async update(req, res) {
    try {
      const result = await UserServices.updateUser(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  static async editPassword(req, res) {
    try {
      const result = await UserServices.editPasswordUser(req);
      res.status(result.status).json({ message: result.message});
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};
