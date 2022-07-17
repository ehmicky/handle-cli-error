import test from 'ava'
import handleCliError from 'handle-cli-error'

import { mockProcessExit, unmockProcessExit } from './helpers/exit.js'

test.before(mockProcessExit)
test.after(unmockProcessExit)

test('Dummy test', (t) => {
  handleCliError()
  t.is(process.exitCode, 1)
})
