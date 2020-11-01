import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  moduleDirectories: ['node_modules', 'lib'],
  moduleNameMapper: {
    'lib/services/(.*)': '<rootDir>/lib/services/$1',
    'lib/repositories/(.*)': '<rootDir>/lib/repositories/$1',
    'lib/constants/(.*)': '<rootDir>/lib/constants/$1',
  },
};

export default config;
