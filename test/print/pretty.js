import test from 'ava'
import chalkString from 'chalk-string'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const addStyles = chalkString({ colors: true })

test.serial('"colors" does not colorize quoted strings in stack line', (t) => {
  const error = new Error('test')
  const stackLines = '    at "a"'
  error.stack = `Error: test\n${stackLines}`
  const { consoleArg } = handleError(error, { colors: true })
  t.true(consoleArg.endsWith(stackLines))
})

each(['Error: ', 'Error [TypeError]: '], ({ title }, name) => {
  test.serial(
    `"colors" does not colorize quoted strings in preview lines | ${title}`,
    (t) => {
      const error = new Error('test "b"')
      const previewLines = '"a"'
      error.stack = `${previewLines}\n${name}${error.stack}`
      const { consoleArg } = handleError(error, { colors: true })
      t.true(consoleArg.startsWith(previewLines))
      t.true(consoleArg.includes(`"${addStyles('bold', 'b')}"`))
    },
  )
})

test.serial(
  '"colors" does not colorize quoted strings without preview nor lines',
  (t) => {
    const error = new Error('test')
    error.stack = '"a"'
    const { consoleArg } = handleError(error, { colors: true })
    t.true(consoleArg.includes(`"${addStyles('bold', 'a')}"`))
  },
)
