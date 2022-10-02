import process from 'process'

// eslint-disable-next-line fp/no-let, init-declarations
let originalProcessExit
// eslint-disable-next-line fp/no-let, init-declarations
let originalProcessExitCode
// eslint-disable-next-line fp/no-let, init-declarations
let exitFuncCode

// Mock `process.exit()` during tests
export const mockProcessExit = function () {
  // eslint-disable-next-line n/prefer-global/process
  const { process } = globalThis

  if (process === undefined) {
    return
  }

  // eslint-disable-next-line fp/no-mutation
  originalProcessExitCode = process.exitCode
  // eslint-disable-next-line fp/no-mutation
  originalProcessExit = process.exit
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
  // eslint-disable-next-line n/prefer-global/process
  const { process } = globalThis

  if (process === undefined) {
    return
  }

  // eslint-disable-next-line fp/no-mutation
  process.exit = originalProcessExit
  process.exitCode = originalProcessExitCode
  // eslint-disable-next-line fp/no-mutation
  exitFuncCode = undefined
}
