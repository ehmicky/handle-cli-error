import test from 'ava'

import { handleError } from './helpers/main.js'

test.serial('Prints error.stack on console', (t) => {
  const error = new Error('test')
  const { consoleMessage } = handleError(error)
  t.is(consoleMessage, error.stack)
})
