import normalizeException from 'normalize-exception'

import { INVALID_OPTS_EXIT_CODE } from '../exit.js'

import { applyDefaultOpts, DEFAULT_OPTS } from './default.js'
import { normalizeOptions } from './validate.js'

// Normalize and validate options
export const getOpts = (error, opts) => {
  try {
    return safeGetOpts(error, opts)
  } catch (error_) {
    // eslint-disable-next-line fp/no-mutation
    error_.message = `handle-cli-error invalid usage: ${error_.message}`
    const errorA = normalizeException(error_)
    return { error: errorA, opts: INVALID_OPTS, beautifulErrorOpts: {} }
  }
}

const safeGetOpts = (error, opts = {}) => {
  const { opts: optsA, beautifulErrorOpts } = normalizeOptions(error.name, opts)
  const optsB = applyDefaultOpts(optsA)
  return { error, opts: optsB, beautifulErrorOpts }
}

// Options used when invalid input is passed
const INVALID_OPTS = {
  ...DEFAULT_OPTS,
  exitCode: INVALID_OPTS_EXIT_CODE,
}
