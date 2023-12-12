const { hashPassword, comparePasswords } = require('../src/fragments/security/config.password');
const bcrypt = require('bcrypt');

// Simulando o módulo bcrypt para criar um mock
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('Criptografia e comparação de senhas', () => {
  describe('hashPassword', () => {
    it('deve criptografar a senha corretamente', async () => {
      const mockPassword = 'senha123';
      const mockHashedPassword = 'senhaCriptografadaMock';

      bcrypt.hash.mockResolvedValue(mockHashedPassword);

      const hashedPassword = await hashPassword(mockPassword);

      // Verifica se a função hash foi chamada com os parâmetros corretos
      expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 12);

      // Verifica se a senha criptografada retornada corresponde à senha esperada
      expect(hashedPassword).toBe(mockHashedPassword);
    });

    it('deve retornar falso em caso de erro', async () => {
      const mockPassword = 'senha123';

      bcrypt.hash.mockRejectedValue(new Error('Erro na criptografia'));

      const hashedPassword = await hashPassword(mockPassword);

      // Verifica se a função hash foi chamada com os parâmetros corretos
      expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 12);

      // Verifica se o retorno é falso em caso de erro
      expect(hashedPassword).toBe(false);
    });
  });

  describe('comparePasswords', () => {
    it('deve retornar true se as senhas coincidirem', async () => {
      const mockPassword = 'senha123';
      const mockHashedPassword = 'senhaCriptografadaMock';

      bcrypt.compare.mockResolvedValue(true);

      const isMatch = await comparePasswords(mockPassword, mockHashedPassword);

      // Verifica se a função compare foi chamada com os parâmetros corretos
      expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHashedPassword);

      // Verifica se o retorno é true quando as senhas coincidem
      expect(isMatch).toBe(true);
    });

    it('deve retornar false se as senhas não coincidirem', async () => {
      const mockPassword = 'senha123';
      const mockHashedPassword = 'senhaCriptografadaMock';

      bcrypt.compare.mockResolvedValue(false);

      const isMatch = await comparePasswords(mockPassword, mockHashedPassword);

      // Verifica se a função compare foi chamada com os parâmetros corretos
      expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHashedPassword);

      // Verifica se o retorno é false quando as senhas não coincidem
      expect(isMatch).toBe(false);
    });
  });
});
