import test from 'ava'
import normalizeException from 'normalize-exception'
import { each } from 'test-each'

import { handleError } from './helpers/main.js'

const testError = normalizeException(new Error('test'))

each(
  [
    { options: {}, expectedMessage: testError.stack },
    { options: { short: true }, expectedMessage: testError.message },
    { options: { silent: true }, expectedMessage: undefined },
  ],
  ({ title }, { options, expectedMessage }) => {
    test.serial(`Prints error on console | ${title}`, (t) => {
      t.is(handleError(testError, options).consoleMessage, expectedMessage)
    })
  },
)

each(['stack', 'Error\nstack', 'Other: test\nstack'], ({ title }, stack) => {
  test.serial(`Prints error name and message on console | ${title}`, (t) => {
    const error = new Error('test')
    error.stack = stack
    const { name, message } = error
    t.is(handleError(error).consoleMessage, `${name}: ${message}\n${stack}`)
  })
})
