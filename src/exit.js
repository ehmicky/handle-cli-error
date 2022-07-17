import process from 'process'

import { waitForTimeout } from './timeout.js'

// We use `process.exitCode` instead of `process.exit()` to let any pending
// tasks complete, with a timeout
export const exitProcess = function (exitCode, timeout) {
  process.exitCode = exitCode
  waitForTimeout(timeout, () => {
    // eslint-disable-next-line unicorn/no-process-exit, n/no-process-exit
    process.exit(exitCode)
  })
}

// Minimum exit code
export const MIN_EXIT_CODE = 0
// 126-255 have special meaning in Bash.
export const MAX_EXIT_CODE = 124
// 125 is reserved for invalid options with `handle-cli-error` itself.
export const INVALID_OPTS_EXIT_CODE = 125
// `options.exitCode` default value
export const DEFAULT_EXIT_CODE = 1
