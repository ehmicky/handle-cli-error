import { inspect } from 'util'

import isErrorInstance from 'is-error-instance'

import { omitProps } from './props.js'

// Print the error.
// If `stack: false`, we do not print the error `stack` nor inline preview,
// which is useful for well-known errors such as input validation.
// Otherwise, we pass the `error` instance to `console.error()`, so it prints
// not only its `message` and `stack` but also its properties, `cause`,
// aggregate `errors`, add colors, inline preview, etc. using `util.inspect()`.
export const printError = function ({ error, silent, stack, props, colors }) {
  if (silent) {
    return
  }

  const errorString = serializeError({ error, stack, props, colors })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(errorString)
}

const serializeError = function ({ error, stack, props, colors }) {
  const errorA = omitProps(error, props)
  omitStack(errorA, stack)
  const errorString = inspect(errorA, { colors })
  const errorStringA = omitStackBracket(errorString, stack)
  restoreStack(errorA, stack)
  return errorStringA
}

// If `stack` is `false`, we do not print stack traces.
// We do it by temporarily removing `error.stack` recursively.
// We prefer this over using some string replacement logic since this is less
// brittle.
const omitStack = function (error, stack) {
  if (!stack) {
    recurseObject(error, omitStackProp)
  }
}

const omitStackProp = function (object) {
  if (
    !isErrorInstance(object) ||
    typeof object.stack !== 'string' ||
    object.stack === ''
  ) {
    return
  }

  setNonEnumProp(object, STACK_SYM, object.stack)
  // eslint-disable-next-line fp/no-delete, no-param-reassign
  delete object.stack
}

const restoreStack = function (error, stack) {
  if (!stack) {
    recurseObject(error, restoreStackProp)
  }
}

const restoreStackProp = function (object) {
  if (object[STACK_SYM] === undefined) {
    return
  }

  setNonEnumProp(object, 'stack', object[STACK_SYM])
  // eslint-disable-next-line fp/no-delete, no-param-reassign
  delete object[STACK_SYM]
}

const STACK_SYM = Symbol('stack')

const setNonEnumProp = function (object, propName, value) {
  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(object, propName, {
    value,
    enumerable: false,
    writable: true,
    configurable: true,
  })
}

// Calls `callFunc(object)` on any object, recursively
const recurseObject = function (value, callFunc) {
  recurseValue(value, callFunc, [])
}

const recurseValue = function (value, callFunc, parents) {
  if (typeof value !== 'object' || value === null || parents.includes(value)) {
    return
  }

  callFunc(value)

  Reflect.ownKeys(value).forEach((key) => {
    recurseValue(value[key], callFunc, [...parents, value])
  })
}

// `util.inspect()` surround `error.name: error.message` with `[...]` when
// `error.stack` is missing. This is unwanted so we remove it.
// This is only removed for the top-level error since nested errors:
//  - Are less frequent
//  - Do not look as weird with `[...]`
//  - Would be harder to fix
const omitStackBracket = function (errorString, stack) {
  return stack ? errorString : errorString.replace(STACK_BRACKET_REGEXP, '$1')
}

const STACK_BRACKET_REGEXP = /^\[([^\]]+)\]/u
