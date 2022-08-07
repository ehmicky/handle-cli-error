import test from 'ava'
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
      const { consoleMessage } = handleError(error)
      t.true(consoleMessage.includes(expectedMessage))
    })
  },
)
