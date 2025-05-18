import test from 'ava'
import figures from 'figures'
import { validateOptions } from 'handle-cli-error'
import { each } from 'test-each'

import { handleError } from './helpers/main.test.js'

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

test.serial('Prettifies message', (t) => {
  const error = new TypeError('test')
  const { consoleArg } = handleError(error)
  t.true(consoleArg.includes(figures.cross))
})

test.serial('Does not log if "silent" is true', (t) => {
  const error = new TypeError('test')
  const { consoleArg } = handleError(error, { silent: true })
  t.is(consoleArg, undefined)
})
