import process from 'node:process'

import { waitForTimeout } from './timeout.js'

// Validate `exitCode` option
export const validateExitCode = (exitCode, optName) => {
  if (
    !Number.isInteger(exitCode) ||
    exitCode < MIN_EXIT_CODE ||
    exitCode > MAX_EXIT_CODE
  ) {
    throw new Error(
      `"${optName}" must be between ${MIN_EXIT_CODE} and ${MAX_EXIT_CODE}: ${exitCode}`,
    )
  }
}

// We use `process.exitCode` instead of `process.exit()` to let any pending
// tasks complete, with a timeout.
export const exitProcess = (exitCode, timeout) => {
  process.exitCode = exitCode
  waitForTimeout(timeout, () => {
    // eslint-disable-next-line unicorn/no-process-exit, n/no-process-exit
    process.exit(exitCode)
  })
}

// Minimum exit code
const MIN_EXIT_CODE = 0
// 126-255 have special meaning in Bash.
const MAX_EXIT_CODE = 124
// 125 is reserved for invalid options with `handle-cli-error` itself.
export const INVALID_OPTS_EXIT_CODE = 125
// `options.exitCode` default value
export const DEFAULT_EXIT_CODE = 1
