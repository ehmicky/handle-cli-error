import test from 'ava'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const testError = new TypeError('test')

each([true, false], ({ title }, colors) => {
  test.serial(`Add colors unless "colors" is false | ${title}`, (t) => {
    t.is(
      hasAnsi(handleError(testError, { colors }).consoleArg),
      colors !== false,
    )
  })
})

test.serial('"colors" defaults to TTY color support', (t) => {
  t.false(hasAnsi(handleError(testError).consoleArg))
})
