/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots:['<rootDir>/test'],
  collectCoverage:true,
  coverageDirectory:'coverage',
  testPathIgnorePatterns:['/node_modules/'],
  verbose:true,
  coverageThreshold:{
    global:{
      branches:100,
      functions:0,
      lines:0,
      statements:0
    }
  }
};