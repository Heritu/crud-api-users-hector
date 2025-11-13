const userModel = require('@models/userModel'); // Chamando o Model

const userService = {
    // FUNÇÕES MÍNIMAS DE CRUD
    getAllUsers: async () => {
        return await userModel.getAllUsers();
    },

    getUserById: async (id) => {
        return await userModel.getUserById(id);
    },

    createUser: async (user) => {
        return await userModel.createUser(user);
    },

    updateUser: async (id, updates) => {
        return await userModel.updateUser(id, updates);
    },
    
    deleteUser: async (id) => {
        return await userModel.deleteUser(id);
    }
};

module.exports = userService;