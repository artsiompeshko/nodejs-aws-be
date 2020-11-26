import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  moduleDirectories: ['node_modules', 'lib'],
  moduleNameMapper: {
    'lib/services/import': '<rootDir>/lib/services/import',
    'lib/services/products': '<rootDir>/lib/services/products',
    'lib/repositories/(.*)': '<rootDir>/lib/repositories/$1',
    'lib/db': '<rootDir>/lib/db',
    'lib/constants/(.*)': '<rootDir>/lib/constants/$1',
  },
};

export default config;
