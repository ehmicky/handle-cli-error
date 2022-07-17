import test from 'ava'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { INVALID_OPTS_EXIT_CODE } from '../src/exit.js'

import { handleError } from './helpers/main.js'

const PACKAGE_NAME = 'handle-cli-error'

each([true], ({ title }, options) => {
  test(`Handle invalid options | ${title}`, (t) => {
    const { consoleMessage, exitCode } = handleError('', options)
    t.true(consoleMessage.includes(PACKAGE_NAME))
    t.is(exitCode, INVALID_OPTS_EXIT_CODE)
  })
})
