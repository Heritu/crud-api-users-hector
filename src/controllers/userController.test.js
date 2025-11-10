// 1. Simula o conteúdo do módulo UserModel, definindo todas as funções como mocks
const mockUserModel = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
};

// 2. O Jest substitui o módulo '@models/userModel' pelo objeto 'mockUserModel'
jest.mock('@models/userModel', () => mockUserModel); 

// O Controller que será testado (deve ser importado DEPOIS do mock)
const userController = require('./userController'); 

// Funções mock para simular req, res e next
const mockRequest = (body = {}, params = {}) => ({ body, params });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); 
    res.json = jest.fn().mockReturnValue(res);  
    res.send = jest.fn().mockReturnValue(res); 
    return res;
};

// Hook para limpar os mocks e resetar o res
beforeEach(() => {
    jest.clearAllMocks(); 
});

describe('UserController', () => {
    let req;
    let res;

    beforeEach(() => {
        res = mockResponse(); 
    });

    // Teste 1: listUsers (Verifica o status 200 de sucesso)
    test('2.1 - Deve retornar status 200 e a lista de usuários', async () => {
        // CORREÇÃO: Usa mockUserModel
        mockUserModel.getAllUsers.mockResolvedValue([{ id: 1 }]); 
        req = mockRequest();

        await userController.listUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        // CORREÇÃO: Verifica a chamada no mockUserModel
        expect(mockUserModel.getAllUsers).toHaveBeenCalledTimes(1); 
    });

    // Teste 2: getUserById (Verifica o retorno de um usuário específico)
    test('2.2 - Deve retornar status 200 e o usuário se o ID for válido', async () => {
        // CORREÇÃO: Usa mockUserModel
        mockUserModel.getUserById.mockResolvedValue({ id: 1 }); 
        req = mockRequest(null, { id: '1' });

        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
        // CORREÇÃO: Verifica a chamada no mockUserModel
        expect(mockUserModel.getUserById).toHaveBeenCalledWith(Number.parseInt('1'));
    });
    
    // Teste 3 (Extra para cobertura): Testa o status 404 (Não Encontrado)
    test('2.3 - Deve retornar status 404 se o usuário não for encontrado', async () => {
        // CORREÇÃO: Usa mockUserModel
        mockUserModel.getUserById.mockResolvedValue(null); 
        req = mockRequest(null, { id: '999' });

        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado.' });
        // CORREÇÃO: Verifica a chamada no mockUserModel
        expect(mockUserModel.getUserById).toHaveBeenCalledWith(Number.parseInt('999'));
    });
});