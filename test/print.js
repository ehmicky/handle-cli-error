import test from 'ava'
import { each } from 'test-each'

import { handleError } from './helpers/main.js'

const createDeepErrors = function () {
  return Array.from({ length: 5 }, createDeepError)
}

const createDeepError = function (_, depth) {
  const error = new Error('test')
  setDeepError(error, depth)
  return error
}

const setDeepError = function (error, depth) {
  if (depth === 0) {
    return
  }

  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, 'cause', {
    value: new Error('test'),
    enumerable: false,
    writable: true,
    configurable: true,
  })
  // eslint-disable-next-line fp/no-delete
  delete error.stack
  setDeepError(error.cause, depth - 1)
}

const testError = new Error('test')
const recursiveError = new Error('test')
// eslint-disable-next-line fp/no-mutation
recursiveError.self = recursiveError
const deepErrors = createDeepErrors()

test.serial('Does not log if "silent" is true', (t) => {
  t.is(handleError(testError, { silent: true }).consoleArg, undefined)
})

each(
  [recursiveError, ...deepErrors],
  [true, false],
  [true, false],
  // eslint-disable-next-line max-params
  ({ title }, error, stack, props) => {
    test.serial(`Prints error name and message | ${title}`, (t) => {
      t.true(
        handleError(error, { stack, props }).consoleArg.includes(
          `${error.name}: ${error.message}`,
        ),
      )
    })

    test.serial(`Does not put the error in brackets | ${title}`, (t) => {
      t.false(
        handleError(error, { stack, props }).consoleArg.startsWith(
          `[${error.name}: ${error.message}]`,
        ),
      )
    })

    test.serial(`Prints stack providing "stack" is true | ${title}`, (t) => {
      t.is(
        handleError(error, { stack, props }).consoleArg.includes('at '),
        stack,
      )
    })
  },
)
