import test from 'ava'

// eslint-disable-next-line no-restricted-imports
import { DEFAULT_EXIT_CODE } from '../src/exit.js'

import { handleError } from './helpers/main.test.js'

test.serial('Default exit code', (t) => {
  const { exitCode, exitCodeAfter } = handleError()
  t.is(exitCode, DEFAULT_EXIT_CODE)
  t.is(exitCodeAfter, DEFAULT_EXIT_CODE)
})

test.serial('Custom exit code', (t) => {
  const customExitCode = 2
  const { exitCode, exitCodeAfter } = handleError('', {
    exitCode: customExitCode,
  })
  t.is(exitCode, customExitCode)
  t.is(exitCodeAfter, customExitCode)
})
