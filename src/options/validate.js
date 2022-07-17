import { MIN_EXIT_CODE, MAX_EXIT_CODE } from '../exit.js'
import { NO_TIMEOUT, INFINITE_TIMEOUT } from '../timeout.js'

// Validate option values
export const validateOpts = function ({ silent, short, exitCode, timeout }) {
  validateBooleanOpt(silent, 'silent')
  validateBooleanOpt(short, 'short')
  validateExitCode(exitCode)
  validateTimeout(timeout)
}

const validateBooleanOpt = function (value, optName) {
  if (typeof value !== 'boolean') {
    return handleInvalidOpts(`options.${optName} must be a boolean: ${value}`)
  }
}

const validateExitCode = function (exitCode) {
  if (
    !Number.isInteger(exitCode) ||
    exitCode < MIN_EXIT_CODE ||
    exitCode > MAX_EXIT_CODE
  ) {
    return handleInvalidOpts(
      `options.exitCode must be between ${MIN_EXIT_CODE} and ${MAX_EXIT_CODE}: ${exitCode}`,
    )
  }
}

const validateTimeout = function (timeout) {
  if (
    (!Number.isInteger(timeout) || timeout <= 0) &&
    !isSpecialTimeout(timeout)
  ) {
    return handleInvalidOpts(
      `options.timeout must be 0, a positive integer or Infinity: ${timeout}`,
    )
  }
}

const isSpecialTimeout = function (timeout) {
  return timeout === INFINITE_TIMEOUT || timeout === NO_TIMEOUT
}

// Handle user errors, i.e. invalid options
export const handleInvalidOpts = function (message) {
  throw new Error(`handle-cli-error invalid usage: ${message}`)
}
