import process from 'node:process'

import { install } from '@sinonjs/fake-timers'
import handleCliError from 'handle-cli-error'
import { stub } from 'sinon'

import { DEFAULT_TIMEOUT, INFINITE_TIMEOUT, NO_TIMEOUT } from '../timeout.js'

// `handle-cli-error` use global variables `process.exitCode`, `process.exit()`
// and `console.error()` so we need to mock them.
// It also relies on timeout, which we need to mock as well.
export const handleError = (error, options) => {
  const clock = startMocks()

  try {
    handleCliError(error, options)
    // eslint-disable-next-line no-restricted-globals, no-console
    const consoleArg = getStubArg(console.error)
    const processExitArgs = getProcessExitArgs(clock, options)
    return { consoleArg, ...processExitArgs }
  } finally {
    stopMocks(clock)
  }
}

const startMocks = () => {
  // eslint-disable-next-line no-restricted-globals
  stub(console, 'error')
  stub(process, 'exit')
  return install()
}

const stopMocks = (clock) => {
  clock.uninstall()
  process.exit.restore()
  process.exitCode = undefined
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error.restore()
}

const getProcessExitArgs = (clock, options) => {
  const { exitCode, exit } = process
  const exitCodeBefore = getStubArg(exit)
  advanceTimeout(clock, options)
  const exitCodeAfter = getStubArg(exit)
  return { exitCode, exitCodeBefore, exitCodeAfter }
}

const advanceTimeout = (clock, { timeout = DEFAULT_TIMEOUT } = {}) => {
  if (timeout !== NO_TIMEOUT && timeout !== INFINITE_TIMEOUT && timeout >= 0) {
    clock.tick(timeout)
  }
}

const getStubArg = ({ args: [[firstCallFirstArg] = []] }) => firstCallFirstArg
