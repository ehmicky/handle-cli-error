import test from 'ava'

import { handleError } from './helpers/main.js'

test.serial('Dummy test', (t) => {
  const { consoleMessage, exitCode, exitCodeBefore, exitCodeAfter } =
    handleError()
  t.true(consoleMessage.includes('Error: undefined'))
  t.is(exitCode, 1)
  t.is(exitCodeBefore, undefined)
  t.is(exitCodeAfter, 1)
})
