'use strict'

class User {
  get rules () {
    return {
      name: 'required',
      username: 'required',
      email: 'required',
      password: 'required',
      type_user_id: 'required',
    }
  }
  get messages() {
    return {
      'name.required': 'Informe a propriedade nome',
      'username.required': 'Informe a propriedade nome de usuário',
      'email.required': 'Informe a propriedade e-mail',
      'password.required': 'Informe a propriedade senha',
      'type_user_id.required': 'Informe a propriedade tipo de usuário',
    }

  }
}

module.exports = User
