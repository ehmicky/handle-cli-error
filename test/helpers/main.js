import handleCliError from 'handle-cli-error'

import { mockConsole, unmockConsole, getConsoleMessage } from './console.js'
import {
  mockProcessExit,
  unmockProcessExit,
  getProcessExitCodes,
} from './exit.js'
import { mockTimeout, unmockTimeout, advanceTimeout } from './timeout.js'

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
export const handleError = function (error, options) {
  const clock = mockAll()

  try {
    handleCliError(error, options)
    const consoleMessage = getConsoleMessage()
    const { exitCode, exitFuncCode: exitCodeBefore } = getProcessExitCodes()
    advanceTimeout(clock, options)
    const { exitFuncCode: exitCodeAfter } = getProcessExitCodes()
    return { consoleMessage, exitCode, exitCodeBefore, exitCodeAfter }
  } finally {
    unmockAll(clock)
  }
}

const mockAll = function () {
  const clock = mockTimeout()
  mockConsole()
  mockProcessExit()
  return clock
}

const unmockAll = function (clock) {
  unmockProcessExit()
  unmockConsole()
  unmockTimeout(clock)
}
