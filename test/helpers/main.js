import process from 'process'

import handleCliError from 'handle-cli-error'
import sinon from 'sinon'

import { mockTimeout, unmockTimeout, advanceTimeout } from './timeout.js'

// eslint-disable-next-line no-restricted-globals
sinon.stub(console, 'error')

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
// eslint-disable-next-line max-statements
export const handleError = function (error, options) {
  const clock = mockAll()

  try {
    resetConsoleMock()
    handleCliError(error, options)
    // eslint-disable-next-line no-restricted-globals, no-console
    const consoleArg = getStubArg(console.error)
    const { exitCode, exit } = process
    const exitCodeBefore = getStubArg(exit)
    advanceTimeout(clock, options)
    const exitCodeAfter = getStubArg(exit)
    return { consoleArg, exitCode, exitCodeBefore, exitCodeAfter }
  } finally {
    unmockAll(clock)
  }
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

const mockProcessExit = function () {
  sinon.stub(process, 'exit')
}

const unmockProcessExit = function () {
  process.exit.restore()
  process.exitCode = undefined
}

const resetConsoleMock = function () {
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error.resetHistory()
}

const getStubArg = function (stub) {
  return stub.args.length === 0 ? undefined : stub.args[0][0]
}
