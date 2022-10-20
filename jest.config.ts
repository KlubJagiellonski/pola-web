import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest';

//import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
  verbose: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  // moduleNameMapper: pathsToModuleNameMapper({
  //   '@App/*': ['app/*'],
  //   '@Assets/*': ['assets/*'],
  //   '@Components/*': ['components/*'],
  //   '@Domain/*': ['domain/*'],
  //   '@Layout/*': ['layout/*'],
  //   '@State/*': ['app/state/*'],
  //   '@Styles/*': ['styles/*'],
  //   '@Templates/*': ['templates/*'],
  //   '@Utils/*': ['utils/*'],
  // }),
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/loadershim.js`],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['jest-expect-message'],
};

export default config;
