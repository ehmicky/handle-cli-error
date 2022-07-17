import test from 'ava'

import { handleError } from './helpers/main.js'

test.serial('Dummy test', (t) => {
  const { exitCode } = handleError()
  t.is(exitCode, 1)
})
