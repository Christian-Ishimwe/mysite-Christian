/** @type {import('ts-jest/dict/types').InitialOptionsTsJest} */
module.exports={
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  clearMocks: true
}