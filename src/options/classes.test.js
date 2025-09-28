import test from 'ava'
import figures from 'figures'
import { each } from 'test-each'

import { handleError } from '../helpers/main.test.js'

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

test.serial('Forward beautiful-error options', (t) => {
  const typeError = new TypeError('test')
  const { consoleArg } = handleError(typeError, { icon: 'warning' })
  t.true(consoleArg.includes(`${figures.warning} TypeError: test`))
})
