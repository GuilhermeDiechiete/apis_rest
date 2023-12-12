const Handling = require('../handlings/UserHandling');

module.exports = class UserController {
  static async register(req, res) {
    try {
      const result = await Handling.userRegister(req);

      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor. ' });
    }
  }

  static async login(req, res) {
    try {
      const result = await Handling.userLogin(req);
      res.status(result.status).json({ message: result.message, token: result.token });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor. ' });
    }
  }

  static async list(req, res) {
    try {
      const result = await Handling.userList(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor. ' });
    }
  }

  static async user(req, res) {
    try {
      const result = await Handling.getUser(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor. ' });
    }
  }

  static async edit(req, res) {
    try {
      const result = await Handling.userEdit(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor. ' });
    }
  }

  static async editPass(req, res) {
    try {
      const result = await Handling.userEditPass(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor. ' });
    }
  }

  static async delete(req, res) {
    try {
      const result = await Handling.userDelete(req);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor. ' });
    }
  }
};
