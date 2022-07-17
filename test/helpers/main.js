import handleCliError from 'handle-cli-error'

import { mockConsole, unmockConsole, getConsoleMessage } from './console.js'
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
    mockConsole()
    mockProcessExit()
    handleCliError(error, options)
    const { exitCode, exitFuncCode } = getProcessExitCodes()
    const consoleMessage = getConsoleMessage()
    unmockProcessExit()
    unmockConsole()
    return { exitCode, exitFuncCode, consoleMessage }
  } catch (libError) {
    return { libError }
  }
}
