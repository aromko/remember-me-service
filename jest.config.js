const createConfig = require('@marigold/jest-config');

module.exports = createConfig({
  // needed 'modulePathIgnorePatterns' because without it throws errors according to:  Haste module map
  // It cannot be resolved, because there exists several different files, or packages,
  // that provide a module for that particular name and platform. The platform is generic (no extension).
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['!**/*.test.node.ts'],
  coverageDirectory: 'coverage/reports/jsdom',
});
