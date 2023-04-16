const { defaults } = require('jest-config');
const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/',
});

const config = {
  preset: 'ts-jest',
  globals: {
    __PATH_PREFIX__: '',
  },
  transform: {
    // '^.+\\.tsx?$': 'ts-jest',
    // '^.+\\.(js|jsx)$': 'babel-jest',
    // '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    // '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '^.+\\.(js|jsx|ts(x?))?$': `<rootDir>/jest-preprocess.js`,
    // ...paths,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
  // setupFilesAfterEnv: [`${__dirname}/src/setupTests.ts`, 'jest-expect-message'],
  testEnvironment: 'jsdom',
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
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  // testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testEnvironmentOptions: {
    url: `http://localhost`,
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [`node_modules`, `.cache`, `\\.cache`, `public`, `<rootDir>.*/public`, `src/utils/test`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link|uuid)/)`],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts', 'cts'],
  verbose: true,
  // automock: true,
};

module.exports = config;
