import test from 'ava'
import { each } from 'test-each'

import { DEFAULT_EXIT_CODE } from '../exit.js'
import { handleError } from '../helpers/main.test.js'

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
      const { exitCode } = handleError('', options)
      t.is(exitCode, expectedCode)
    })
  },
)
