import process from 'process'

import normalizeException from 'normalize-exception'

import { getOpts } from './options.js'

// Print CLI errors and exit, depending on the error type
export default function handleCliError(error, opts) {
  const errorA = normalizeException(error)
  const { silent, short, exitCode, timeout } = getOpts(errorA, opts)
  printError(errorA, silent, short)
  exitProcess(exitCode, timeout)
}

// Print the error message and|or stack trace
const printError = function (error, silent, short) {
  if (silent) {
    return
  }

  const errorMessage = short ? error.message : error.stack
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(errorMessage)
}

// We use `process.exitCode` instead of `process.exit()` to let any pending
// tasks complete, with a timeout
const exitProcess = function (exitCode, timeout) {
  if (timeout === 0) {
    // eslint-disable-next-line unicorn/no-process-exit, n/no-process-exit
    process.exit(exitCode)
    return
  }

  process.exitCode = exitCode

  if (timeout === Number.POSITIVE_INFINITY) {
    return
  }

  setTimeout(() => {
    // eslint-disable-next-line unicorn/no-process-exit, n/no-process-exit
    process.exit(exitCode)
  }, timeout).unref()
}
