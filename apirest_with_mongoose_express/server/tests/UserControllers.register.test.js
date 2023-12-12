// IMPORT FILES TESTS
const UserController = require('../src/controllers/UserControllers');
const UserServices = require('../src/services/UserServices');

// Simulando o módulo UserServices para criar um mock
jest.mock('../src/services/UserServices', () => ({
  createUser: jest.fn(),
}));

describe('Testar o User Controller', () => {
  describe('Deve retornar sucesso no registro', () => {
    test('deve chamar UserServices.createUser com a requisição correta', async () => {
      const mockReq = {
        name: 'Guilherme',
        email: 'testando@email.com',
        phone: '55996781644',
        password: 'senha123',
        confirmpassword: 'senha123',
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(), // simulando a função de status
        json: jest.fn(), // simulando a função json
      }; // objeto de resposta simulado

      const mockResponse = {
        status: 200,
        messageResponse: 'Usuário criado com sucesso', // Mensagem simulada de resposta
      };

      // Configurando o retorno simulado da função createUser
      UserServices.createUser.mockResolvedValue(mockResponse);

      // Chamando o método a ser testado
      await UserController.register(mockReq, mockRes);

      // Verificando se a função createUser foi chamada com a requisição correta
      expect(UserServices.createUser).toHaveBeenCalledWith(mockReq);

      // Verificando se a função de status foi chamada com o status correto
      expect(mockRes.status).toHaveBeenCalledWith(200);

      // Verificando se a função json foi chamada com a mensagem correta
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuário criado com sucesso' });
    });

    it('deve lidar com erros apropriadamente', async () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Criando um erro simulado
      const mockError = new Error('Erro interno do servidor');

      // Configurando o retorno simulado da função createUser quando ocorre um erro
      UserServices.createUser.mockRejectedValue(mockError);

      // Chamando o método a ser testado
      await UserController.register(mockReq, mockRes);

      // Verificando se a função de status foi chamada com o status correto para um erro
      expect(mockRes.status).toHaveBeenCalledWith(500);

      // Verificando se a função json foi chamada com a mensagem de erro apropriada
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Erro interno do servidor' });
    });
  });
});
