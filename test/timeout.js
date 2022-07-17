import test from 'ava'

// eslint-disable-next-line no-restricted-imports
import { NO_TIMEOUT, INFINITE_TIMEOUT } from '../src/timeout.js'

import { handleError } from './helpers/main.js'

test.serial('Default timeout', (t) => {
  const { exitCodeBefore, exitCodeAfter } = handleError()
  t.is(exitCodeBefore, undefined)
  t.not(exitCodeAfter, undefined)
})

test.serial('No timeout', (t) => {
  const { exitCodeBefore, exitCodeAfter } = handleError('', {
    timeout: NO_TIMEOUT,
  })
  t.not(exitCodeBefore, undefined)
  t.not(exitCodeAfter, undefined)
})

test.serial('Infinite timeout', (t) => {
  const { exitCodeBefore, exitCodeAfter } = handleError('', {
    timeout: INFINITE_TIMEOUT,
  })
  t.is(exitCodeBefore, undefined)
  t.is(exitCodeAfter, undefined)
})
