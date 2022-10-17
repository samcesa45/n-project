module.exports = {
  'roots': [
    '<rootDir>/src'
  ],
  'testMatch': [
    '**/__test__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}