import process from 'process'

const originalProcessExit = process.exit
const originalProcessExitCode = process.exitCode

// Mock `process.exit()` during tests
export const mockProcessExit = function () {
  // eslint-disable-next-line fp/no-mutation
  process.exit = mockedProcessExit
}

const mockedProcessExit = function (exitCode) {
  // eslint-disable-next-line fp/no-mutation
  exitFuncCode = exitCode
}

// Retrieve value passed to `process.exitCode` and mocked `process.exit()`
export const getProcessExitCodes = function () {
  return { exitCode: process.exitCode, exitFuncCode }
}

// Reverse `mockProcessExit()`
export const unmockProcessExit = function () {
  process.exitCode = originalProcessExitCode
  // eslint-disable-next-line fp/no-mutation
  process.exit = originalProcessExit
  // eslint-disable-next-line fp/no-mutation
  exitFuncCode = undefined
}

// eslint-disable-next-line fp/no-let, init-declarations
let exitFuncCode
