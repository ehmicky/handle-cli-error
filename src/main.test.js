import test from 'ava'
import { validateOptions } from 'handle-cli-error'
import { each } from 'test-each'

import { handleError } from './helpers/main.test.js'

const testError = new TypeError('test')

each(
  [
    { error: undefined, expectedMessage: 'Error: undefined' },
    { error: null, expectedMessage: 'Error: null' },
    { error: 'test', expectedMessage: 'Error: test' },
    { error: new TypeError('test'), expectedMessage: 'TypeError: test' },
  ],
  ({ title }, { error, expectedMessage }) => {
    test.serial(`Normalize error | ${title}`, (t) => {
      const { consoleArg } = handleError(error)
      t.true(consoleArg.includes(expectedMessage))
    })
  },
)

test.serial('validateOpts() throws on invalid options', (t) => {
  t.throws(validateOptions.bind(undefined, { silent: 'true' }))
})

test.serial('validateOpts() does not throw on valid options', (t) => {
  t.notThrows(validateOptions.bind(undefined, { silent: true }))
})

test.serial('Does not log if "silent" is true', (t) => {
  const { consoleArg } = handleError(testError, { silent: true })
  t.is(consoleArg, undefined)
})
