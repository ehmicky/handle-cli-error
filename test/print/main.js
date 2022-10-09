import test from 'ava'

import { handleError } from '../helpers/main.js'

const testError = new TypeError('test')

test.serial('Does not log if "silent" is true', (t) => {
  t.is(handleError(testError, { silent: true }).consoleArg, undefined)
})
