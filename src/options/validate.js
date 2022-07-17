import {
  exitProcess,
  MIN_EXIT_CODE,
  MAX_EXIT_CODE,
  INVALID_OPTS_EXIT_CODE,
  NO_TIMEOUT,
  INFINITE_TIMEOUT,
} from '../exit.js'

// Validate option values
export const validateOpts = function ({ silent, short, exitCode, timeout }) {
  validateBooleanOpt(silent, 'silent')
  validateBooleanOpt(short, 'short')
  validateExitCode(exitCode)
  validateTimeout(timeout)
}

const validateBooleanOpt = function (value, optName) {
  if (typeof value !== 'boolean') {
    handleInvalidOpts(`options.${optName} must be a boolean: ${value}`)
  }
}

const validateExitCode = function (exitCode) {
  if (
    !Number.isInteger(exitCode) ||
    exitCode < MIN_EXIT_CODE ||
    exitCode > MAX_EXIT_CODE
  ) {
    handleInvalidOpts(
      `options.exitCode must be between ${MIN_EXIT_CODE} and ${MAX_EXIT_CODE}: ${exitCode}`,
    )
  }
}

const validateTimeout = function (timeout) {
  if (
    (!Number.isInteger(timeout) && timeout !== INFINITE_TIMEOUT) ||
    isNegativeTimeout(timeout)
  ) {
    handleInvalidOpts(
      `options.timeout must be 0, a positive integer or Infinity: ${timeout}`,
    )
  }
}

const isNegativeTimeout = function (timeout) {
  return timeout <= 0 && timeout !== NO_TIMEOUT
}

// Handle user errors, i.e. invalid options
export const handleInvalidOpts = function (message) {
  const error = new Error(`handle-cli-error invalid usage: ${message}`)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(error.stack)
  exitProcess(INVALID_OPTS_EXIT_CODE, 0)
}
