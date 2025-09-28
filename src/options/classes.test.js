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

each(
  [
    { options: { icon: 'warning' }, icon: 'warning' },
    {
      options: { classes: { TypeError: { icon: 'warning' } } },
      icon: 'warning',
    },
    { options: { classes: { URIError: { icon: 'warning' } } }, icon: 'cross' },
  ],
  ({ title }, { options, icon }) => {
    test.serial(`Forward beautiful-error options | ${title}`, (t) => {
      const typeError = new TypeError('test')
      const { consoleArg } = handleError(typeError, options)
      t.true(consoleArg.includes(`${figures[icon]} TypeError: test`))
    })
  },
)

test.serial('Apply option "classes" to nested errors', (t) => {
  const typeError = new TypeError('test', { cause: new URIError('test') })
  const { consoleArg } = handleError(typeError, {
    classes: {
      TypeError: { icon: 'warning' },
      URIError: { icon: 'info' },
    },
  })
  t.true(consoleArg.includes(`${figures.warning} TypeError: test`))
  t.true(consoleArg.includes(`${figures.info} URIError: test`))
})
