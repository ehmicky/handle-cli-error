import process from 'process'

import { install } from '@sinonjs/fake-timers'
import handleCliError from 'handle-cli-error'
import sinon from 'sinon'

// eslint-disable-next-line no-restricted-imports
import {
  NO_TIMEOUT,
  INFINITE_TIMEOUT,
  DEFAULT_TIMEOUT,
} from '../../src/timeout.js'

// eslint-disable-next-line no-restricted-globals
sinon.stub(console, 'error')
sinon.stub(process, 'exit')
const clock = install()

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
export const handleError = function (error, options) {
  try {
    resetMocks()
    handleCliError(error, options)
    // eslint-disable-next-line no-restricted-globals, no-console
    const consoleArg = getStubArg(console.error)
    const processExitArgs = getProcessExitArgs(options)
    return { consoleArg, ...processExitArgs }
  } finally {
    process.exitCode = undefined
  }
}

const resetMocks = function () {
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error.resetHistory()
  process.exit.resetHistory()
  clock.reset()
}

const getProcessExitArgs = function (options) {
  const { exitCode, exit } = process
  const exitCodeBefore = getStubArg(exit)
  advanceTimeout(options)
  const exitCodeAfter = getStubArg(exit)
  return { exitCode, exitCodeBefore, exitCodeAfter }
}

const advanceTimeout = function ({ timeout = DEFAULT_TIMEOUT } = {}) {
  if (timeout !== NO_TIMEOUT && timeout !== INFINITE_TIMEOUT && timeout >= 0) {
    clock.tick(timeout)
  }
}

const getStubArg = function (stub) {
  return stub.args.length === 0 ? undefined : stub.args[0][0]
}
