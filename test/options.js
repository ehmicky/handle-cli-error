import test from 'ava'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { INVALID_OPTS_EXIT_CODE, DEFAULT_EXIT_CODE } from '../src/exit.js'

import { handleError } from './helpers/main.js'

const PACKAGE_NAME = 'handle-cli-error'

each(
  [
    true,
    { types: true },
    { types: { default: true } },
    { silent: 0 },
    { short: 0 },
    { exitCode: '0' },
    { exitCode: 0.1 },
    { exitCode: Number.NaN },
    { exitCode: Number.POSITIVE_INFINITY },
    { exitCode: Number.NEGATIVE_INFINITY },
    { exitCode: -1 },
    { exitCode: 125 },
    { exitCode: 126 },
    { timeout: '0' },
    { timeout: 0.1 },
    { timeout: Number.NaN },
    { timeout: Number.NEGATIVE_INFINITY },
    { timeout: -1 },
  ],
  ({ title }, options) => {
    test(`Handle invalid options | ${title}`, (t) => {
      const { consoleMessage, exitCode } = handleError('', options)
      t.true(consoleMessage.includes(PACKAGE_NAME))
      t.true(consoleMessage.includes('at '))
      t.is(exitCode, INVALID_OPTS_EXIT_CODE)
    })
  },
)

each(
  [
    { options: { exitCode: undefined }, expectedCode: DEFAULT_EXIT_CODE },
    {
      options: { exitCode: 2, types: { default: { exitCode: undefined } } },
      expectedCode: 2,
    },
  ],
  ({ title }, { options, expectedCode }) => {
    test(`Undefined options are ignored | ${title}`, (t) => {
      t.is(handleError('', options).exitCode, expectedCode)
    })
  },
)

each(
  [
    { types: { TypeError: { exitCode: 2 } } },
    { exitCode: 2, types: { Error: { exitCode: 1 } } },
    { types: { Error: { exitCode: 1 }, default: { exitCode: 2 } } },
    { types: { TypeError: { exitCode: 2 }, default: { exitCode: 1 } } },
    { exitCode: 1, types: { default: { exitCode: 2 } } },
    { exitCode: 2, types: { typeerror: { exitCode: 1 } } },
  ],
  ({ title }, options) => {
    test(`Apply option "types" | ${title}`, (t) => {
      const typeError = new TypeError('test')
      const { exitCode } = handleError(typeError, options)
      t.is(exitCode, 2)
    })
  },
)
