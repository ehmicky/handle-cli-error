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
  stack: true,
  props: true,
  icon: 'cross',
  header: 'red bold',
  exitCode: DEFAULT_EXIT_CODE,
  timeout: DEFAULT_TIMEOUT,
}

// Remove `undefined` values of an object
export const removeUndefined = (object) => excludeKeys(object, isUndefined)

const isUndefined = (key, value) => value === undefined
