module.exports = {
  // Diz ao Jest para não falhar se não houver testes.
  passWithNoTests: true,

  // Mapeamento de caminhos para resolver o erro '../../models/UserModel'
  moduleNameMapper: {
    '^@models/(.*)$': '<rootDir>/src/models/$1',
  },

  // Onde o Jest deve procurar pelos arquivos de código-fonte
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
  ],

  // Configura onde o relatório LCOV deve ser salvo
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],

  // Ambiente de teste para projetos Node.js
  testEnvironment: "node"
};