/* eslint-disable max-lines */
import test from 'ava'
import { serialize } from 'error-serializer'
import { each } from 'test-each'

import { handleError } from './helpers/main.js'

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

const testError = new TypeError('test')
const recursiveError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
recursiveError.self = recursiveError
const deepErrors = createDeepErrors()
const propsError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
propsError.prop = 'propValue'
const ownNameError = new Error('test')
// eslint-disable-next-line fp/no-mutation
ownNameError.name = 'TypeError'

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

    test.serial(`Does not modify the error | ${title}`, (t) => {
      const errorCopy = serialize(error)
      handleError(error, { stack, props })
      t.deepEqual(serialize(error), errorCopy)
    })
  },
)

each([true, false], [true, false], ({ title }, stack, props) => {
  test.serial(`Prints properties providing "props" is true | ${title}`, (t) => {
    t.is(
      handleError(propsError, { stack, props }).consoleArg.includes(
        propsError.prop,
      ),
      props,
    )
  })

  test.serial(`Prints error name consistently | ${title}`, (t) => {
    t.true(
      handleError(ownNameError, { stack, props }).consoleArg.includes(
        `Error [${ownNameError.name}`,
      ),
    )
  })
})

const nonErrorStackError = new Error('test')
// eslint-disable-next-line fp/no-mutation
nonErrorStackError.prop = { stack: 'propStack' }

test.serial('Does not remove stacks from non-errors', (t) => {
  t.true(
    handleError(nonErrorStackError, {
      stack: false,
      props: true,
    }).consoleArg.includes(nonErrorStackError.prop.stack),
  )
})
