import test from 'ava'
import normalizeException from 'normalize-exception'
import { each } from 'test-each'

import { handleError } from './helpers/main.js'

const error = normalizeException(new Error('test'))

each(
  [
    { options: {}, expectedMessage: error.stack },
    { options: { short: true }, expectedMessage: error.message },
    { options: { silent: true }, expectedMessage: undefined },
  ],
  ({ title }, { options, expectedMessage }) => {
    test.serial(`Prints error on console | ${title}`, (t) => {
      t.is(handleError(error, options).consoleMessage, expectedMessage)
    })
  },
)
