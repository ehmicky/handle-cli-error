import normalizeException from 'normalize-exception'

import { INVALID_OPTS_EXIT_CODE } from '../exit.js'
import { DEFAULT_TIMEOUT } from '../timeout.js'

import { removeUndefined, applyDefaultOpts } from './default.js'
import { validateOpts } from './validate.js'

// Normalize and validate options
export const getOpts = function (opts, error) {
  try {
    return safeGetOpts(opts, error)
  } catch (error_) {
    const errorA = normalizeException(error_)
    return { error: errorA, opts: INVALID_OPTS }
  }
}

const safeGetOpts = function (opts, error) {
  validateOpts(opts)
  const optsA = applyClassesOpts(error, opts)
  const optsB = applyDefaultOpts(optsA)
  return { error, opts: optsB }
}

// `options.classes.{ErrorName}.*` is like `options.*` but only applies if
// `error.name` matches.
const applyClassesOpts = function ({ name }, { classes = {}, ...opts } = {}) {
  const classesOpts = classes[name] || classes.default || {}
  return { ...opts, ...removeUndefined(classesOpts) }
}

// Options used when invalid input is passed
const INVALID_OPTS = {
  silent: false,
  short: false,
  exitCode: INVALID_OPTS_EXIT_CODE,
  timeout: DEFAULT_TIMEOUT,
}
