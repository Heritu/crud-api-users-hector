// Este teste verifica as funções do Service que criamos.
const userService = require('./userService');
const userModel = require('models/userModel'); // O Service chama o Model

// Mocks para isolar o Service do banco de dados (Model)
jest.mock('../models/userModel', () => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
}));

describe('UserService - Funcionalidades CRUD', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Teste 1: getAllUsers
    test('1.1 - Deve retornar uma lista de usuários e chamar o getAllUsers do Model', async () => {
        userModel.getAllUsers.mockResolvedValue([{ id: 1, nome: 'Teste' }]);
        
        const users = await userService.getAllUsers();
        
        expect(Array.isArray(users)).toBe(true);
        expect(userModel.getAllUsers).toHaveBeenCalledTimes(1);
    });

    // Teste 2: getUserById
    test('1.2 - Deve buscar um usuário pelo ID corretamente e chamar o Model', async () => {
        const mockUser = { id: 10, nome: 'Teste Jest' };
        userModel.getUserById.mockResolvedValue(mockUser);

        const user = await userService.getUserById(10);
        
        expect(user.id).toBe(10);
        expect(userModel.getUserById).toHaveBeenCalledWith(10);
    });
});