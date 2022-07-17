import handleCliError from 'handle-cli-error'

import {
  mockProcessExit,
  unmockProcessExit,
  getProcessExitCodes,
} from './exit.js'

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
export const handleError = function (error, options) {
  try {
    mockProcessExit()
    handleCliError(error, options)
    const { exitCode, exitFuncCode } = getProcessExitCodes()
    unmockProcessExit()
    return { exitCode, exitFuncCode }
  } catch (libError) {
    return { libError }
  }
}
