import test from 'ava'
import { serialize } from 'error-serializer'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const createDeepErrors = function () {
  return Array.from({ length: 5 }, createDeepError)
}

const createDeepError = function (_, depth) {
  const error = new TypeError('test')
  setDeepError(error, depth)
  return error
}

const setDeepError = function (error, depth) {
  if (depth === 0) {
    return
  }

  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, 'cause', {
    value: new TypeError('test'),
    enumerable: false,
    writable: true,
    configurable: true,
  })
  // eslint-disable-next-line fp/no-delete
  delete error.stack
  setDeepError(error.cause, depth - 1)
}

const recursiveError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
recursiveError.self = recursiveError
const deepErrors = createDeepErrors()
const ownNameError = new Error('test')
// eslint-disable-next-line fp/no-mutation
ownNameError.name = 'TypeError'

each(
  [recursiveError, ...deepErrors],
  [true, false, undefined],
  [true, false, undefined],
  // eslint-disable-next-line max-params
  ({ title }, error, stack, props) => {
    test.serial(`Prints stack unless "stack" is false | ${title}`, (t) => {
      t.is(
        handleError(error, { stack, props }).consoleArg.includes('at '),
        stack !== false,
      )
    })

    test.serial(`Does not put the error in brackets | ${title}`, (t) => {
      t.false(
        handleError(error, { stack, props }).consoleArg.startsWith(
          `[${error.name}: ${error.message}]`,
        ),
      )
    })

    test.serial(`Does not modify the error | ${title}`, (t) => {
      const errorCopy = serialize(error)
      handleError(error, { stack, props })
      t.deepEqual(serialize(error), errorCopy)
    })

    test.serial(`Prints error name and message | ${title}`, (t) => {
      t.true(
        handleError(error, { stack, props }).consoleArg.includes(
          `${error.name}: ${error.message}`,
        ),
      )
    })
  },
)

each([true, false], [true, false], ({ title }, stack, props) => {
  test.serial(`Prints error name consistently | ${title}`, (t) => {
    t.true(
      handleError(ownNameError, { stack, props }).consoleArg.includes(
        `Error [${ownNameError.name}`,
      ),
    )
  })
})

test.serial('Does not remove stacks from non-errors', (t) => {
  const error = new Error('test')
  error.prop = { stack: 'propStack' }
  t.true(
    handleError(error, { stack: false, props: true }).consoleArg.includes(
      error.prop.stack,
    ),
  )
})
