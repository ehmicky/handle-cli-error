import process from 'node:process'

import { install } from '@sinonjs/fake-timers'
import handleCliError from 'handle-cli-error'
import { stub } from 'sinon'

import { NO_TIMEOUT, INFINITE_TIMEOUT, DEFAULT_TIMEOUT } from '../timeout.js'

// eslint-disable-next-line no-restricted-globals
stub(console, 'error')
stub(process, 'exit')
const clock = install()

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
export const handleError = (error, options) => {
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

const resetMocks = () => {
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error.resetHistory()
  process.exit.resetHistory()
  clock.reset()
}

const getProcessExitArgs = (options) => {
  const { exitCode, exit } = process
  const exitCodeBefore = getStubArg(exit)
  advanceTimeout(options)
  const exitCodeAfter = getStubArg(exit)
  return { exitCode, exitCodeBefore, exitCodeAfter }
}

const advanceTimeout = ({ timeout = DEFAULT_TIMEOUT } = {}) => {
  if (timeout !== NO_TIMEOUT && timeout !== INFINITE_TIMEOUT && timeout >= 0) {
    clock.tick(timeout)
  }
}

const getStubArg = ({ args: [[firstCallFirstArg] = []] }) => firstCallFirstArg
