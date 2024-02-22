module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '.+\\.(css|less|scss|png|jpg|svg)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['./test/setup.js'],
  testRunner: 'jest-jasmine2'
}
