import test from 'ava'
import { validateOptions } from 'handle-cli-error'
import { each } from 'test-each'

import { INVALID_OPTS_EXIT_CODE } from '../exit.js'
import { handleError } from '../helpers/main.test.js'

const PACKAGE_NAME = 'handle-cli-error'

each(
  [
    true,
    { silent: 0 },
    { stack: 0 },
    { cause: 0 },
    { props: 0 },
    { colors: 0 },
    { icon: 'unknown' },
    { header: 0 },
    { log: 0 },
    { exitCode: '0' },
    { exitCode: 0.1 },
    { exitCode: Number.NaN },
    { exitCode: Number.POSITIVE_INFINITY },
    { exitCode: Number.NEGATIVE_INFINITY },
    { exitCode: -1 },
    { exitCode: 256 },
    { timeout: '0' },
    { timeout: 0.1 },
    { timeout: Number.NaN },
    { timeout: Number.NEGATIVE_INFINITY },
    { timeout: -1 },
    { custom: 0 },
    { unknown: true },
    { classes: true },
    { classes: { default: true } },
    { classes: { default: { classes: {} } } },
    { classes: { default: { silent: 0 } } },
    { classes: { default: { stack: 0 } } },
    { classes: { default: { cause: 0 } } },
    { classes: { Error: true } },
    { classes: { Error: { classes: {} } } },
    { classes: { Error: { silent: 0 } } },
    { classes: { Error: { stack: 0 } } },
    { classes: { Error: { cause: 0 } } },
  ],
  ({ title }, options) => {
    test.serial(`Handle invalid options | ${title}`, (t) => {
      const { consoleArg, exitCode } = handleError('', options)
      t.true(consoleArg.includes(PACKAGE_NAME))
      t.is(exitCode, INVALID_OPTS_EXIT_CODE)
    })

    test.serial(`Expose validateOptions() | ${title}`, (t) => {
      t.throws(validateOptions.bind(undefined, options))
    })
  },
)

each(
  [
    ...[
      'silent',
      'stack',
      'cause',
      'props',
      'colors',
      'exitCode',
      'timeout',
      'log',
    ].flatMap((optName) => [
      { [optName]: undefined },
      { classes: { default: { [optName]: undefined } } },
    ]),
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
