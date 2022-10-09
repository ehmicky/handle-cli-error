import test from 'ava'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { INVALID_OPTS_EXIT_CODE, DEFAULT_EXIT_CODE } from '../src/exit.js'

import { handleError } from './helpers/main.js'

const PACKAGE_NAME = 'handle-cli-error'

each(
  [
    true,
    { silent: 0 },
    { stack: 0 },
    { props: 0 },
    { colors: 0 },
    { icon: 'unknown' },
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
    { unknown: true },
    { classes: true },
    { classes: { default: true } },
    { classes: { default: { classes: {} } } },
  ],
  ({ title }, options) => {
    test.serial(`Handle invalid options | ${title}`, (t) => {
      const { consoleArg, exitCode } = handleError('', options)
      t.true(consoleArg.includes(PACKAGE_NAME))
      t.is(exitCode, INVALID_OPTS_EXIT_CODE)
    })
  },
)

each(
  [
    ...['silent', 'stack', 'props', 'colors', 'exitCode', 'timeout'].flatMap(
      (optName) => [
        { [optName]: undefined },
        { classes: { default: { [optName]: undefined } } },
      ],
    ),
    ...[undefined, {}].flatMap((value) => [
      value,
      { classes: value },
      { classes: { default: value } },
    ]),
  ],
  ({ title }, options) => {
    test.serial(`Allow undefined options | ${title}`, (t) => {
      t.not(handleError('', options), INVALID_OPTS_EXIT_CODE)
    })
  },
)

each(
  [
    { options: { exitCode: undefined }, expectedCode: DEFAULT_EXIT_CODE },
    {
      options: { exitCode: 2, classes: { default: { exitCode: undefined } } },
      expectedCode: 2,
    },
  ],
  ({ title }, { options, expectedCode }) => {
    test.serial(`Undefined options are ignored | ${title}`, (t) => {
      t.is(handleError('', options).exitCode, expectedCode)
    })
  },
)

each(
  [
    { classes: { TypeError: { exitCode: 2 } } },
    { exitCode: 2, classes: { Error: { exitCode: 1 } } },
    { classes: { Error: { exitCode: 1 }, default: { exitCode: 2 } } },
    { classes: { TypeError: { exitCode: 2 }, default: { exitCode: 1 } } },
    { exitCode: 1, classes: { default: { exitCode: 2 } } },
    { exitCode: 2, classes: { typeerror: { exitCode: 1 } } },
  ],
  ({ title }, options) => {
    test.serial(`Apply option "classes" | ${title}`, (t) => {
      const typeError = new TypeError('test')
      const { exitCode } = handleError(typeError, options)
      t.is(exitCode, 2)
    })
  },
)
