import test from 'ava'
import handleCliError from 'handle-cli-error'

test('Dummy test', (t) => {
  t.is(typeof handleCliError, 'function')
})
