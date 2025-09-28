import { validateOptions as validateBeautifulOptions } from 'beautiful-error'
import isPlainObj from 'is-plain-obj'

import { validateExitCode } from '../exit.js'
import { validateTimeout } from '../timeout.js'

import { applyClassesOpts, validateObject } from './classes.js'

// Validate option values.
// This is exported, although not documented.
export const validateOptions = (opts = {}) => {
  validateObject(opts, 'options')

  const { classes } = opts
  const names =
    isPlainObj(classes) && Object.keys(classes).length !== 0
      ? Object.keys(classes)
      : ['default']
  names.forEach((name) => {
    normalizeOptions(name, opts)
  })
}

export const normalizeOptions = (name, opts) => {
  const { opts: optsA, beautifulErrorOpts } = applyClassesOpts(name, opts)
  Object.entries(optsA).forEach(validateOpt)
  validateBeautifulOptions(beautifulErrorOpts)
  return { opts: optsA, beautifulErrorOpts }
}

const validateOpt = ([optName, optValue]) => {
  if (optValue !== undefined) {
    VALIDATORS[optName](optValue, optName)
  }
}

const validateBooleanOpt = (value, optName) => {
  if (typeof value !== 'boolean') {
    throw new TypeError(`"${optName}" must be a boolean: ${value}`)
  }
}

const validateFunction = (value, optName) => {
  if (typeof value !== 'function') {
    throw new TypeError(`"${optName}" must be a function: ${value}`)
  }
}

const VALIDATORS = {
  silent: validateBooleanOpt,
  exitCode: validateExitCode,
  timeout: validateTimeout,
  log: validateFunction,
}
