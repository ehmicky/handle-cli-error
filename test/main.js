import test from 'ava'

import { handleError } from './helpers/main.js'

test.serial('Dummy test', (t) => {
  const { exitCode, consoleMessage } = handleError()
  t.is(exitCode, 1)
  t.true(consoleMessage.includes('Error: undefined'))
})
