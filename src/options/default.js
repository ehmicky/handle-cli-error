import { excludeKeys } from 'filter-obj'

// Apply default options
export const applyDefaultOpts = function (opts) {
  return { ...DEFAULT_OPTS, ...removeUndefined(opts) }
}

// Default values of options
const DEFAULT_OPTS = { silent: false, short: false, exitCode: 1, timeout: 5e3 }

// Remove `undefined` values of an object
export const removeUndefined = function (object) {
  return excludeKeys(object, isUndefined)
}

const isUndefined = function (key, value) {
  return value === undefined
}
