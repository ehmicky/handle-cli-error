import test from 'ava'
import figures from 'figures'
import { validateOptions } from 'handle-cli-error'
import { spy } from 'sinon'
import { each } from 'test-each'

import { handleError } from './helpers/main.test.js'

each(
  [
    { error: undefined, expectedMessage: 'Error: undefined' },
    { error: null, expectedMessage: 'Error: null' },
    { error: 'test', expectedMessage: 'Error: test' },
    { error: new TypeError('test'), expectedMessage: 'TypeError: test' },
  ],
  ({ title }, { error, expectedMessage }) => {
    test.serial(`Normalize error | ${title}`, (t) => {
      const { consoleArg } = handleError(error)
      t.true(consoleArg.includes(expectedMessage))
    })
  },
)

test.serial('validateOpts() throws on invalid options', (t) => {
  t.throws(validateOptions.bind(undefined, { silent: 'true' }))
})

test.serial('validateOpts() does not throw on valid options', (t) => {
  t.notThrows(validateOptions.bind(undefined, { silent: true }))
})

test.serial('Prettifies message', (t) => {
  const error = new TypeError('test')
  const { consoleArg } = handleError(error)
  t.true(consoleArg.includes(figures.cross))
})

test.serial('Does not log if "silent" is true', (t) => {
  const error = new TypeError('test')
  const { consoleArg } = handleError(error, { silent: true })
  t.is(consoleArg, undefined)
})

test.serial('Can pass custom log function', (t) => {
  const error = new TypeError('test')
  const log = spy()
  handleError(error, { log })
  t.true(log.calledOnce)
  t.is(log.args.length, 1)
  t.true(log.firstCall.args[0].includes('TypeError: test'))
})

// eslint-disable-next-line fp/no-class
class CustomError extends Error {
  // eslint-disable-next-line class-methods-use-this
  beautiful(errorString) {
    return errorString.toUpperCase()
  }
}

test.serial('Can use .beautiful()', (t) => {
  const error = new CustomError('test')
  const { consoleArg } = handleError(error)
  t.true(consoleArg.includes(`${figures.cross} CUSTOMERROR: TEST`))
})

test.serial('Can use .beautiful() deeply', (t) => {
  const error = new Error('test', { cause: new CustomError('inner') })
  const { consoleArg } = handleError(error)
  t.true(consoleArg.includes(`${figures.cross} Error: test`))
  t.true(consoleArg.includes(`\n    ${figures.cross} CUSTOMERROR: INNER`))
})
