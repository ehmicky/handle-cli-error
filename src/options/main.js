import isPlainObj from 'is-plain-obj'
import normalizeException from 'normalize-exception'

import { INVALID_OPTS_EXIT_CODE } from '../exit.js'
import { DEFAULT_TIMEOUT } from '../timeout.js'

import { applyTypesOpts } from './classes.js'
import { applyDefaultOpts } from './default.js'
import { handleInvalidOpts, validateOpts } from './validate.js'

// Normalize and validate options
export const getOpts = function (error, opts) {
  try {
    return safeGetOpts(error, opts)
  } catch (error_) {
    const errorA = normalizeException(error_)
    return { error: errorA, opts: INVALID_OPTS }
  }
}

const safeGetOpts = function (error, opts = {}) {
  if (!isPlainObj(opts)) {
    return handleInvalidOpts(`options must be a plain object: ${opts}`)
  }

  const optsA = applyTypesOpts(opts, error)
  const optsB = applyDefaultOpts(optsA)
  validateOpts(optsB)
  return { error, opts: optsB }
}

// Options used when invalid input is passed
const INVALID_OPTS = {
  silent: false,
  short: false,
  exitCode: INVALID_OPTS_EXIT_CODE,
  timeout: DEFAULT_TIMEOUT,
}
