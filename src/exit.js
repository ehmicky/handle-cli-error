import process from 'process'

// We use `process.exitCode` instead of `process.exit()` to let any pending
// tasks complete, with a timeout
export const exitProcess = function (exitCode, timeout) {
  if (timeout === NO_TIMEOUT) {
    // eslint-disable-next-line unicorn/no-process-exit, n/no-process-exit
    process.exit(exitCode)
    return
  }

  process.exitCode = exitCode

  if (timeout === INFINITE_TIMEOUT) {
    return
  }

  setTimeout(() => {
    // eslint-disable-next-line unicorn/no-process-exit, n/no-process-exit
    process.exit(exitCode)
  }, timeout).unref()
}

// Minimum exit code
export const MIN_EXIT_CODE = 0
// 126-255 have special meaning in Bash.
export const MAX_EXIT_CODE = 124
// 125 is reserved for invalid options with `handle-cli-error` itself.
export const INVALID_OPTS_EXIT_CODE = 125
// `options.exitCode` default value
export const DEFAULT_EXIT_CODE = 1

// `options.timeout` value that disables waiting on exit
export const NO_TIMEOUT = 0
// `options.timeout` value that disables timing out while waiting
export const INFINITE_TIMEOUT = Number.POSITIVE_INFINITY
// `options.timeout` default value
export const DEFAULT_TIMEOUT = 5e3
