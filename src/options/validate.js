import isPlainObj from 'is-plain-obj'

import { validateExitCode } from '../exit.js'
import { validateHeader } from '../print/header.js'
import { validateIcon } from '../print/icon.js'
import { validateTimeout } from '../timeout.js'

import { validateClasses } from './classes.js'
import { handleInvalidOpts } from './invalid.js'

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

  validator(optValue, optName, validateAllOpts)
}

const validateBooleanOpt = function (value, optName) {
  if (typeof value !== 'boolean') {
    handleInvalidOpts('must be a boolean', value, optName)
  }
}

const VALIDATORS = {
  silent: validateBooleanOpt,
  stack: validateBooleanOpt,
  props: validateBooleanOpt,
  colors: validateBooleanOpt,
  icon: validateIcon,
  header: validateHeader,
  exitCode: validateExitCode,
  timeout: validateTimeout,
  classes: validateClasses,
}
