import isPlainObj from 'is-plain-obj'

import { validateExitCode } from '../exit.js'
import { validateTimeout } from '../timeout.js'

import { validateClasses } from './classes.js'
import { handleInvalidOpts } from './invalid.js'

// Validate option values.
// This is exported, although not documented.
export const validateOptions = (opts) => {
  validateAllOpts(opts, [])
}

const validateAllOpts = (opts, optName) => {
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

const validateOpt = (optValue, optName) => {
  if (optValue === undefined || BEAUTIFUL_ERROR_OPTS.has(optName)) {
    return
  }

  const validator = VALIDATORS[optName.at(-1)]

  if (validator === undefined) {
    handleInvalidOpts('is an unknown option', '', optName)
  }

  validator(optValue, optName, validateAllOpts)
}

const validateBooleanOpt = (value, optName) => {
  if (typeof value !== 'boolean') {
    handleInvalidOpts('must be a boolean', value, optName)
  }
}

const VALIDATORS = {
  silent: validateBooleanOpt,
  exitCode: validateExitCode,
  timeout: validateTimeout,
  classes: validateClasses,
}

const BEAUTIFUL_ERROR_OPTS = new Set([
  'stack',
  'props',
  'colors',
  'icon',
  'header',
])
