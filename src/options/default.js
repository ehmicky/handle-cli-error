import { excludeKeys } from 'filter-obj'

import { DEFAULT_EXIT_CODE } from '../exit.js'
import { DEFAULT_TIMEOUT } from '../timeout.js'

// Apply default options
export const applyDefaultOpts = (opts) => ({
  ...DEFAULT_OPTS,
  ...removeUndefined(opts),
})

// Default values of options
export const DEFAULT_OPTS = {
  silent: false,
  exitCode: DEFAULT_EXIT_CODE,
  timeout: DEFAULT_TIMEOUT,
  // Do not pass `console.error` directly, to allow monkey-patching
  log(message) {
    // eslint-disable-next-line no-console, no-restricted-globals
    console.error(message)
  },
}

// Remove `undefined` values of an object
export const removeUndefined = (object) => excludeKeys(object, isUndefined)

const isUndefined = (key, value) => value === undefined
