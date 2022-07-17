import { excludeKeys } from 'filter-obj'
import isPlainObj from 'is-plain-obj'

// Normalize options
export const getOpts = function (error, opts = {}) {
  if (!isPlainObj(opts)) {
    return handleOptsError(
      `options must be a plain object: ${opts}`,
      DEFAULT_OPTS,
    )
  }

  const { types = {}, ...optsA } = opts
  const typesOpts = findTypesOpts(types, error.name)
  const optsB = {
    ...DEFAULT_OPTS,
    ...removeUndefined(optsA),
    ...removeUndefined(typesOpts),
  }
  const optsC = normalizeOpts(optsB)
  return optsC
}

const findTypesOpts = function (types, name) {
  if (!isPlainObj(types)) {
    return handleOptsError(`options.types must be a plain object: ${types}`, {})
  }

  return getTypesOpts(types, name) || getTypesOpts(types, 'default') || {}
}

const getTypesOpts = function (types, name) {
  const typesOpts = types[name]

  if (typesOpts === undefined) {
    return
  }

  if (!isPlainObj(typesOpts)) {
    return handleOptsError(
      `options.types.${name} must be a plain object: ${typesOpts}`,
      {},
    )
  }

  return typesOpts
}

const DEFAULT_OPTS = { silent: false, short: false, exitCode: 1, timeout: 5e3 }

const removeUndefined = function (object) {
  return excludeKeys(object, isUndefined)
}

const isUndefined = function (key, value) {
  return value === undefined
}

const normalizeOpts = function ({ silent, short, exitCode, timeout }) {
  return {
    silent: normalizeBooleanOpt(silent, 'silent'),
    short: normalizeBooleanOpt(short, 'short'),
    exitCode: normalizeExitCode(exitCode),
    timeout: normalizeTimeout(timeout),
  }
}

const normalizeBooleanOpt = function (value, optName) {
  return typeof value === 'boolean'
    ? value
    : handleOptsError(
        `options.${optName} must be a boolean: ${value}`,
        DEFAULT_OPTS[optName],
      )
}

const normalizeExitCode = function (exitCode) {
  return Number.isInteger(exitCode) &&
    exitCode >= MIN_EXIT_CODE &&
    exitCode <= MAX_EXIT_CODE
    ? exitCode
    : handleOptsError(
        `options.exitCode must be between ${MIN_EXIT_CODE} and ${MAX_EXIT_CODE}: ${exitCode}`,
        DEFAULT_OPTS.exitCode,
      )
}

const MIN_EXIT_CODE = 0
// 126-255 have special meaning in Bash
const MAX_EXIT_CODE = 125

const normalizeTimeout = function (timeout) {
  return (Number.isInteger(timeout) && timeout >= 0) ||
    timeout === Number.POSITIVE_INFINITY
    ? timeout
    : handleOptsError(
        `options.timeout must be 0, a positive integer or Infinity: ${timeout}`,
        DEFAULT_OPTS.timeout,
      )
}

// We do not throw since we are using the top-level error handling logic
const handleOptsError = function (message, value) {
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(`handle-cli-error invalid usage: ${message}`)
  return value
}
