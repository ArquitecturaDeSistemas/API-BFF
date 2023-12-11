/* eslint-disable prettier/prettier */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './', // Asegúrate de que esta ruta sea correcta respecto a la ubicación de tu jest.config.ts
  testRegex: '.*\\.spec\\.ts$', // Busca archivos que terminen en .spec.ts
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    // Agrega mapeos si usas alias en tus importaciones, por ejemplo:
    },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{js,ts}'], // Ajusta esto según tus necesidades
  coverageDirectory: '../coverage', // Directorio para la cobertura de código
  testPathIgnorePatterns: ['/node_modules/'], // Ignora los directorios que no deseas probar
  // Agrega cualquier otra configuración que necesites
};
