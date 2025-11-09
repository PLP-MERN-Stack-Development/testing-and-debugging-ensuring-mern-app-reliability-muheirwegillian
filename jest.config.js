module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/cypress/**',
        '!**/*.config.js',
        '!**/dist/**',
        '!**/build/**'
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    },
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

