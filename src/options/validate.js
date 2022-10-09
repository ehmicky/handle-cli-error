import isPlainObj from 'is-plain-obj'

import { MIN_EXIT_CODE, MAX_EXIT_CODE } from '../exit.js'
import { NO_TIMEOUT, INFINITE_TIMEOUT } from '../timeout.js'

// Validate option values.
// This is exported, although not documented.
export const validateOptions = function (opts) {
  validateAllOpts(opts, [])
}

const validateAllOpts = function (opts, optName) {
  if (opts === undefined) {
    return
  }

  if (!isPlainObj(opts)) {
    handleInvalidOpts('must be a plain object', opts, optName)
  }

  Object.entries(opts).forEach(([key, optValue]) => {
    validateOpt(optValue, [...optName, key])
  })
}

const validateOpt = function (optValue, optName) {
  if (optValue === undefined) {
    return
  }

  const validator = VALIDATORS[optName[optName.length - 1]]

  if (validator === undefined) {
    handleInvalidOpts('is an unknown option', '', optName)
  }

  validator(optValue, optName)
}

const validateBooleanOpt = function (value, optName) {
  if (typeof value !== 'boolean') {
    handleInvalidOpts('must be a boolean', value, optName)
  }
}

const validateExitCode = function (exitCode, optName) {
  if (
    !Number.isInteger(exitCode) ||
    exitCode < MIN_EXIT_CODE ||
    exitCode > MAX_EXIT_CODE
  ) {
    handleInvalidOpts(
      `must be between ${MIN_EXIT_CODE} and ${MAX_EXIT_CODE}`,
      exitCode,
      optName,
    )
  }
}

const validateTimeout = function (timeout, optName) {
  if (
    (!Number.isInteger(timeout) || timeout <= 0) &&
    !isSpecialTimeout(timeout)
  ) {
    handleInvalidOpts(
      'must be 0, a positive integer or Infinity',
      timeout,
      optName,
    )
  }
}

const isSpecialTimeout = function (timeout) {
  return timeout === INFINITE_TIMEOUT || timeout === NO_TIMEOUT
}

const validateClasses = function (classes, optName) {
  if (!isPlainObj(classes)) {
    handleInvalidOpts('must be a plain object', classes, optName)
  }

  if (optName.length > 1) {
    handleInvalidOpts('must not be defined', classes, optName)
  }

  Object.entries(classes).forEach(([className, classOpts]) => {
    validateAllOpts(classOpts, [...optName, className])
  })
}

const VALIDATORS = {
  silent: validateBooleanOpt,
  stack: validateBooleanOpt,
  exitCode: validateExitCode,
  timeout: validateTimeout,
  classes: validateClasses,
}

const handleInvalidOpts = function (message, value, optName) {
  const fullOptName =
    optName.length === 0 ? 'options' : `"${optName.join('.')}"`
  throw new Error(`${fullOptName} ${message}: ${value}`)
}
