import isErrorInstance from 'is-error-instance'

// If `stack` is `false`, we do not print stack traces.
// We do it by temporarily removing `error.stack` recursively.
// We prefer this over using some string replacement logic since this is less
// brittle.
export const omitStack = function (error, stack) {
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

export const restoreStack = function (error, stack) {
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
  recurseValue(value, callFunc, 0)
}

const recurseValue = function (value, callFunc, depth) {
  if (
    typeof value !== 'object' ||
    value === null ||
    depth >= PRINT_MAX_DEPTH + 2
  ) {
    return
  }

  callFunc(value)

  Reflect.ownKeys(value).forEach((key) => {
    recurseValue(value[key], callFunc, depth + 1)
  })
}

// This is the default value, but we prevent overriding it with
// `inspect.defaultOptions`
export const PRINT_MAX_DEPTH = 2

// `util.inspect()` surround `error.name: error.message` with `[...]` when
// `error.stack` is missing. This is unwanted so we remove it.
// This is only removed for the top-level error since nested errors:
//  - Are less frequent
//  - Do not look as weird with `[...]`
//  - Would be harder to fix
export const omitStackBracket = function (errorString, stack) {
  return stack ? errorString : errorString.replace(STACK_BRACKET_REGEXP, '$1')
}

const STACK_BRACKET_REGEXP = /^\[([^\]]+)\]/u
