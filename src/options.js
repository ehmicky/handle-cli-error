import isPlainObj from 'is-plain-obj'

import { applyDefaultOpts } from './default.js'
import { handleOptsError } from './exit.js'
import { applyTypesOpts } from './types.js'
import { validateOpts } from './validate.js'

// Normalize and validate options
export const getOpts = function (error, opts = {}) {
  if (!isPlainObj(opts)) {
    handleOptsError(`options must be a plain object: ${opts}`)
    return
  }

  const optsA = applyTypesOpts(opts, error)
  const optsB = applyDefaultOpts(optsA)
  validateOpts(optsB)
  return optsB
}
