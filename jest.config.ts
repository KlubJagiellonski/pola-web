/* eslint-disable import/order */

/* eslint-disable @typescript-eslint/no-var-requires */
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: [`${__dirname}/src/setupTests.ts`, 'jest-expect-message'],
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/app/$1',
    '^@Assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@Components/(.*)$': '<rootDir>/src/components/$1',
    '^@Domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@Layout/(.*)$': '<rootDir>/src/layout/$1',
    '^@State/(.*)$': '<rootDir>/src/app/state/$1',
    '^@Styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@Templates/(.*)$': '<rootDir>/src/gatsby-templates/$1',
    '^@Utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`, `src/utils/test`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'jest-environment-node',
};

export default config;
