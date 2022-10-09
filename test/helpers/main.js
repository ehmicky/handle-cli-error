import handleCliError from 'handle-cli-error'
import sinon from 'sinon'

import {
  mockProcessExit,
  unmockProcessExit,
  getProcessExitCodes,
} from './exit.js'
import { mockTimeout, unmockTimeout, advanceTimeout } from './timeout.js'

// eslint-disable-next-line no-restricted-globals
sinon.stub(console, 'error')

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
export const handleError = function (error, options) {
  const clock = mockAll()

  try {
    resetConsoleMock()
    handleCliError(error, options)
    const consoleArg = getConsoleArg()
    const { exitCode, exitFuncCode: exitCodeBefore } = getProcessExitCodes()
    advanceTimeout(clock, options)
    const { exitFuncCode: exitCodeAfter } = getProcessExitCodes()
    return { consoleArg, exitCode, exitCodeBefore, exitCodeAfter }
  } finally {
    unmockAll(clock)
  }
}

const resetConsoleMock = function () {
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error.resetHistory()
}

const getConsoleArg = function () {
  // eslint-disable-next-line no-restricted-globals, no-console
  return console.error.args.length === 0 ? undefined : console.error.args[0][0]
}

const mockAll = function () {
  const clock = mockTimeout()
  mockProcessExit()
  return clock
}

const unmockAll = function (clock) {
  unmockProcessExit()
  unmockTimeout(clock)
}
