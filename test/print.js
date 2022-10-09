import test from 'ava'
import { each } from 'test-each'

import { handleError } from './helpers/main.js'

const testError = new Error('test')

each(
  [
    { options: {}, expectedArg: testError },
    { options: { stack: false }, expectedArg: testError.message },
    { options: { silent: true }, expectedArg: undefined },
  ],
  ({ title }, { options, expectedArg }) => {
    test.serial(`Prints error on console | ${title}`, (t) => {
      t.is(handleError(testError, options).consoleArg, expectedArg)
    })
  },
)
