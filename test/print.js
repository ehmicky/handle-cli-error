import test from 'ava'
import { each } from 'test-each'

import { handleError } from './helpers/main.js'

const testError = new Error('test')

test.serial('Does not log if "silent" is true', (t) => {
  t.is(handleError(testError, { silent: true }).consoleArg, undefined)
})

each([true, false], [true, false], ({ title }, stack, props) => {
  test.serial(`Prints error name and message | ${title}`, (t) => {
    t.true(
      handleError(testError, { stack, props }).consoleArg.includes(
        `${testError.name}: ${testError.message}`,
      ),
    )
  })

  test.serial(`Does not put the error in brackets | ${title}`, (t) => {
    t.false(
      handleError(testError, { stack, props }).consoleArg.includes(
        `[${testError.name}: ${testError.message}]`,
      ),
    )
  })

  test.serial(
    `Prints top-level stack providing "stack" is true | ${title}`,
    (t) => {
      t.is(
        handleError(testError, { stack, props }).consoleArg.includes('at '),
        stack,
      )
    },
  )
})
