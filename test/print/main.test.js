import test from 'ava'

import { handleError } from '../helpers/main.js'

const testError = new TypeError('test')

test.serial('Does not log if "silent" is true', (t) => {
  const { consoleArg } = handleError(testError, { silent: true })
  t.is(consoleArg, undefined)
})
