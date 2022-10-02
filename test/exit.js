import test from 'ava'

// eslint-disable-next-line no-restricted-imports
import { DEFAULT_EXIT_CODE } from '../src/exit.js'

import { handleError } from './helpers/main.js'

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

test.serial('No process', (t) => {
  const customExitCode = 2
  // eslint-disable-next-line n/prefer-global/process
  const { process } = globalThis
  // eslint-disable-next-line n/prefer-global/process, fp/no-mutation
  globalThis.process = undefined
  const { exitCode, exitCodeAfter } = handleError('', {
    exitCode: customExitCode,
  })
  // eslint-disable-next-line n/prefer-global/process, fp/no-mutation
  globalThis.process = process
  t.is(exitCode, undefined)
  t.is(exitCodeAfter, undefined)
})
