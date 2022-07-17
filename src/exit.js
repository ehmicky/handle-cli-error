import process from 'process'

import { DEFAULT_OPTS } from './default.js'

// Handle user errors, i.e. invalid options
export const handleOptsError = function (message) {
  const error = new Error(`handle-cli-error invalid usage: ${message}`)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(error.stack)
  exitProcess(INVALID_OPTS_EXIT_CODE, DEFAULT_OPTS.timeout)
}

export const MIN_EXIT_CODE = 0
// 126-255 have special meaning in Bash.
// 125 is reserved for invalid options with `handle-cli-error` itself.
export const MAX_EXIT_CODE = 124
const INVALID_OPTS_EXIT_CODE = 125

// We use `process.exitCode` instead of `process.exit()` to let any pending
// tasks complete, with a timeout
export const exitProcess = function (exitCode, timeout) {
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
