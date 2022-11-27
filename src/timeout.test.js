import test from 'ava'

// eslint-disable-next-line no-restricted-imports
import { DEFAULT_EXIT_CODE } from './exit.js'
import { handleError } from './helpers/main.test.js'
// eslint-disable-next-line no-restricted-imports
import { NO_TIMEOUT, INFINITE_TIMEOUT } from './timeout.js'

test.serial('Default timeout', (t) => {
  const { exitCodeBefore, exitCodeAfter } = handleError()
  t.is(exitCodeBefore, undefined)
  t.is(exitCodeAfter, DEFAULT_EXIT_CODE)
})

test.serial('No timeout', (t) => {
  const { exitCodeBefore, exitCodeAfter } = handleError('', {
    timeout: NO_TIMEOUT,
  })
  t.is(exitCodeBefore, DEFAULT_EXIT_CODE)
  t.is(exitCodeAfter, DEFAULT_EXIT_CODE)
})

test.serial('Infinite timeout', (t) => {
  const { exitCodeBefore, exitCodeAfter } = handleError('', {
    timeout: INFINITE_TIMEOUT,
  })
  t.is(exitCodeBefore, undefined)
  t.is(exitCodeAfter, undefined)
})
