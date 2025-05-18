import test from 'ava'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import {
  DEFAULT_EXIT_CODE,
  INVALID_OPTS_EXIT_CODE,
  MAX_EXIT_CODE,
} from './exit.js'
import { handleError } from './helpers/main.test.js'

test.serial('Default exit code', (t) => {
  const { exitCode, exitCodeAfter } = handleError()
  t.is(exitCode, DEFAULT_EXIT_CODE)
  t.is(exitCodeAfter, DEFAULT_EXIT_CODE)
})

each(
  [0, 2, INVALID_OPTS_EXIT_CODE, MAX_EXIT_CODE],
  ({ title }, customExitCode) => {
    test.serial(`Custom exit code | ${title}`, (t) => {
      const { exitCode, exitCodeAfter } = handleError('', {
        exitCode: customExitCode,
      })
      t.is(exitCode, customExitCode)
      t.is(exitCodeAfter, customExitCode)
    })
  },
)
