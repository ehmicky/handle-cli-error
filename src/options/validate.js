import { handleOptsError, MIN_EXIT_CODE, MAX_EXIT_CODE } from '../exit.js'

// Validate option values
export const validateOpts = function ({ silent, short, exitCode, timeout }) {
  validateBooleanOpt(silent, 'silent')
  validateBooleanOpt(short, 'short')
  validateExitCode(exitCode)
  validateTimeout(timeout)
}

const validateBooleanOpt = function (value, optName) {
  if (typeof value !== 'boolean') {
    handleOptsError(`options.${optName} must be a boolean: ${value}`)
  }
}

const validateExitCode = function (exitCode) {
  if (
    !Number.isInteger(exitCode) ||
    exitCode < MIN_EXIT_CODE ||
    exitCode > MAX_EXIT_CODE
  ) {
    handleOptsError(
      `options.exitCode must be between ${MIN_EXIT_CODE} and ${MAX_EXIT_CODE}: ${exitCode}`,
    )
  }
}

const validateTimeout = function (timeout) {
  if (
    (!Number.isInteger(timeout) && timeout !== Number.POSITIVE_INFINITY) ||
    timeout < 0
  ) {
    handleOptsError(
      `options.timeout must be 0, a positive integer or Infinity: ${timeout}`,
    )
  }
}
