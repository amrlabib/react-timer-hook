module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    testMatch: ['**/?(*.)+(spec|test).ts?(x)'], // Look for files ending in .test.ts, .test.tsx, etc.
    globals: {
      'ts-jest': {
        isolatedModules: true, // This speeds up the tests if you're using isolated modules
      },
    },
    moduleNameMapper: {
      '^@utils$': '<rootDir>/src/utils/index',  // Map @utils to src/utils/index
    },
};
  