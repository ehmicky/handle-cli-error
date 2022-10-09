import { excludeKeys } from 'filter-obj'

import { DEFAULT_EXIT_CODE } from '../exit.js'
import { DEFAULT_TIMEOUT } from '../timeout.js'

// Apply default options
export const applyDefaultOpts = function (opts) {
  return { ...DEFAULT_OPTS, ...removeUndefined(opts) }
}

// Default values of options
export const DEFAULT_OPTS = {
  silent: false,
  stack: true,
  props: true,
  icon: 'cross',
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
