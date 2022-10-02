import test from 'ava'
import { validateOptions } from 'handle-cli-error'
import { each } from 'test-each'

import { handleError } from './helpers/main.js'

each(
  [
    { error: undefined, expectedMessage: 'Error: undefined' },
    // eslint-disable-next-line unicorn/no-null
    { error: null, expectedMessage: 'Error: null' },
    { error: 'test', expectedMessage: 'Error: test' },
    { error: new TypeError('test'), expectedMessage: 'TypeError: test' },
  ],
  ({ title }, { error, expectedMessage }) => {
    test.serial(`Normalize error | ${title}`, (t) => {
      const { consoleArg } = handleError(error)
      t.true(consoleArg.toString().includes(expectedMessage))
    })
  },
)

test('validateOpts() throws on invalid options', (t) => {
  t.throws(validateOptions.bind(undefined, { silent: 'true' }))
})

test('validateOpts() does not throw on valid options', (t) => {
  t.notThrows(validateOptions.bind(undefined, { silent: true }))
})
