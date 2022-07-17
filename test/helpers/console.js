// eslint-disable-next-line no-restricted-globals, no-console
const originalConsoleError = console.error

// Mock `console.error()` during test
export const mockConsole = function () {
  // eslint-disable-next-line fp/no-mutation, no-restricted-globals, no-console
  console.error = mockedConsoleError
}

const mockedConsoleError = function (message) {
  // eslint-disable-next-line fp/no-mutation
  consoleMessage = message
}

// Retrieve value passed to mocked `console.error()`
export const getConsoleMessage = function () {
  return consoleMessage
}

// Reverse `mockConsole()`
export const unmockConsole = function () {
  // eslint-disable-next-line fp/no-mutation, no-restricted-globals, no-console
  console.error = originalConsoleError
}

// eslint-disable-next-line fp/no-let, init-declarations
let consoleMessage
