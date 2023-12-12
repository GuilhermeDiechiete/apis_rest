class Validator {
  constructor(value, campo) {
    this.value = value;
    this.campo = campo;
  }

  static check(value, campo) {
    return new Validator(value, campo);
  }

  notNullMsg(msg) {
    if (!this.value) {
      throw new Error(msg);
    }
    return this;
  }

  existsMsg(msg) {
    if (this.value) {
      throw new Error(msg);
    }
    return this;
  }

  invalidMsg(msg) {
    if (!this.value) {
      throw new Error(msg);
    }
    return this;
  }

  // VALIDAÇÕES DE TIPO E TAMANHO
  notNull() {
    if (!this.value) {
      throw new Error(`O campo ${this.campo} é obrigatório!`);
    }
    return this;
  }

  eguals(secondValue, campoSecondValue) {
    if (this.value !== secondValue) {
      throw new Error(`Os campos ${this.campo} e ${campoSecondValue} precisam ser iguais!`);
    }
    return this;
  }

  egualsMsg(value2, msg) {
    if (this.value !== value2) throw new Error(msg);
  }

  exists() {
    if (this.value) {
      throw new Error(`O ${this.campo} já existe, por favor, utilize outro!`);
    }
    return this;
  }

  string() {
    if (typeof this.value !== 'string') {
      throw new Error(`O campo ${this.campo} precisa ser apenas texto!`);
    }
    return this;
  }

  numeric() {
    const re = /^\d+$/;
    if (!re.test(this.value)) {
      throw new Error(`O campo ${this.campo} precisa ser um valor numérico!`);
    }
    return this;
  }

  minLength(length) {
    if (this.value.length <= length) {
      throw new Error(`O campo ${this.campo} precisa ter mais de ${length} caracteres!`);
    }
    return this;
  }

  maxLength(length) {
    if (this.value.length >= length) {
      throw new Error(`O campo ${this.campo} precisa ter menos de ${length} caracteres!`);
    }
    return this;
  }

  // DADOS PESSOAIS
  age() {
    const re = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (!re.test(this.value)) {
      throw new Error(`O campo ${this.campo} precisa ser uma idade válida!`);
    }
    return this;
  }

  email() {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(this.value)) {
      throw new Error(`O campo ${this.campo} precisa ser um endereço de e-mail válido!`);
    }
    return this;
  }

  phone() {
    const re = /^\d{10,11}$/;
    if (!re.test(this.value)) {
      throw new Error(`O campo ${this.campo} precisa ser um número de telefone válido de 10 ou 11 dígitos!`);
    }
    return this;
  }

  date() {
    const re = /^(0?[1-9]|[1-2][0-9]|3[0-1])-(0?[1-9]|1[0-2])-\d{4}$/;
    if (!re.test(this.value)) {
      throw new Error(`O campo ${this.campo} precisa ser uma data válida no formato DD-MM-YYYY!`);
    }
    return this;
  }

  currency() {
    const re = /^\d+(,\d{1,2})?$/;
    if (!re.test(this.value)) {
      throw new Error(`O campo ${this.campo} precisa ser um valor em reais com até duas casas decimais!`);
    }
    return this;
  }
}

module.exports = Validator;
