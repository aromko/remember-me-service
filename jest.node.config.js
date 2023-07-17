const createConfig = require('@marigold/jest-config');

const jestConfig = createConfig({
  // needed 'modulePathIgnorePatterns' because without it throws errors according to:  Haste module map
  // It cannot be resolved, because there exists several different files, or packages,
  // that provide a module for that particular name and platform. The platform is generic (no extension).
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['!**/*.test.{ts,tsx}', '**/*.test.node.{ts,tsx}'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  collectCoverageFrom: ['**/pages/api/*/*.{ts,tsx}'],
  coverageDirectory: 'coverage/reports/node',
});

console.log('Jest Configuration:', jestConfig);

module.exports = jestConfig;
