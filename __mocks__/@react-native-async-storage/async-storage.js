/**
 * Mock for @react-native-async-storage/async-storage.
 * Used globally via Jest moduleNameMapper so all tests get this mock.
 */

const defaultMultiGet = [
  ['X', null],
  ['O', null],
  ['draw', null],
];

const mockAsyncStorage = {
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  multiGet: jest.fn(() => Promise.resolve(defaultMultiGet)),
  clear: jest.fn(() => Promise.resolve()),
};

module.exports = mockAsyncStorage;