// Simulação do userModel para isolar o Controller
const mockUserModel = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
};

// Faz o Jest simular o módulo do Model (evita erros de caminho e conexão)
jest.mock('@models/userModel', () => mockUserModel); 

// O Controller que será testado (garante o require correto)
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

beforeEach(() => {
    jest.clearAllMocks(); 
});

describe('UserController', () => {
    let req;
    let res;

    beforeEach(() => {
        res = mockResponse(); 
    });

    // Teste 1: listUsers
    test('1.1 - Deve retornar status 200 e a lista de usuários', async () => {
        mockUserModel.getAllUsers.mockResolvedValue([{ id: 1 }]); 
        req = mockRequest();

        await userController.listUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

    // Teste 2: getUserById
    test('1.2 - Deve retornar status 200 e o usuário se o ID for válido', async () => {
        mockUserModel.getUserById.mockResolvedValue({ id: 1 }); 
        req = mockRequest(null, { id: '1' });

        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });
    
    // Teste 3: Testa o status 404
    test('1.3 - Deve retornar status 404 se o usuário não for encontrado', async () => {
        mockUserModel.getUserById.mockResolvedValue(null); 
        req = mockRequest(null, { id: '999' });

        await userController.getUserById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não encontrado.' });
    });
});