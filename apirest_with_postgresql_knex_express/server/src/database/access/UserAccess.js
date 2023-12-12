const knex = require('../connection');

module.exports = class UserAccess {
  // accesses to get data
  static async getEmail(email) {
    try {
      const result = await knex.select('email').from('users').where({ email }).first();
      return result;
    } catch (error) {
      return false;
    }
  }

  static async getPasswordByEmail(email) {
    try {
      const result = await knex.select('password').from('users').where({ email }).first();
      return result;
    } catch (error) {
      return false;
    }
  }

  static async getUserByEmail(email) {
    try {
      const result = await knex.select('id', 'name', 'email', 'age', 'phone').from('users').where({ email }).first();
      return result;
    } catch (error) {
      return false;
    }
  }

  static async getUserById(id) {
    try {
      const result = await knex.select('id', 'name', 'email', 'age', 'phone').from('users').where({ id }).first();
      return result;
    } catch (error) {
      return false;
    }
  }

  static async getUserFullById(id) {
    try {
      const result = await knex.select('id', 'name', 'email', 'age', 'phone', 'password').from('users').where({ id }).first();
      return result;
    } catch (error) {
      return false;
    }
  }

  static async getUsers() {
    try {
      const result = await knex.select('id', 'name', 'email', 'age', 'phone').from('users');
      return result;
    } catch (error) {
      return false;
    }
  }

  // CRUD methods
  static async create(user) {
    try {
      await knex.insert({
        name: user.name,
        email: user.email,
        age: user.age,
        phone: user.phone,
        password: user.password,
      }).into('users');
      return true;
    } catch (error) {
      return false;
    }
  }

  static async updateUser(id, update) {
    try {
      if (id === undefined || id === 0) {
        return false;
      }
      const result = await knex.update({
        id,
        name: update.name,
        email: update.email,
        phone: update.phone,
        age: update.age,
      }).where({ id }).table('users');

      if (!result) {
        return false;
      }
      const user = await knex.select('id', 'name', 'email', 'age', 'phone').from('users').where({ id }).first();
      return user;
    } catch (error) {
      return false;
    }
  }

  static async updatePass(id, newPassword) {
    try {
      if (id === undefined || id === 0) {
        return false;
      }
      const result = await knex.update({
        password: newPassword,
      }).where({ id }).table('users');

      if (!result) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  static async deleteUserById(id) {
    try {
      if (id !== undefined) {
        await knex.delete().from('users').where('id', id);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
};
