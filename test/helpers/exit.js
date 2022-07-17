import process from 'process'

const originalProcessExit = process.exit
const originalProcessExitCode = process.exitCode

// Mock `process.exit()` during test
export const mockProcessExit = function () {
  // eslint-disable-next-line fp/no-mutation
  process.exit = function exit(exitCode) {
    // eslint-disable-next-line fp/no-mutation
    processExitFuncCode = exitCode
  }
}

// Reverse `mockProcessExit()`
export const unmockProcessExit = function () {
  // eslint-disable-next-line fp/no-mutation
  process.exit = originalProcessExit
  process.exitCode = originalProcessExitCode
}

// Retrieve value passed to mocked `process.exit()`
export const getProcessExitFuncCode = function () {
  return processExitFuncCode
}

// Retrieve value passed to mocked `process.exitCode`
export const getProcessExitCode = function () {
  return process.exitCode
}

// eslint-disable-next-line fp/no-let, init-declarations
let processExitFuncCode
