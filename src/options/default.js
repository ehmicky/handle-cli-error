import { excludeKeys } from 'filter-obj'

import { DEFAULT_EXIT_CODE, DEFAULT_TIMEOUT } from '../exit.js'

// Apply default options
export const applyDefaultOpts = function (opts) {
  return { ...DEFAULT_OPTS, ...removeUndefined(opts) }
}

// Default values of options
const DEFAULT_OPTS = {
  silent: false,
  short: false,
  exitCode: DEFAULT_EXIT_CODE,
  timeout: DEFAULT_TIMEOUT,
}

// Remove `undefined` values of an object
export const removeUndefined = function (object) {
  return excludeKeys(object, isUndefined)
}

const isUndefined = function (key, value) {
  return value === undefined
}
