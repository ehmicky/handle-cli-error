import test from 'ava'
import colorsOption from 'colors-option'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const testError = new TypeError('test')
const chalk = colorsOption({ colors: true })

each([true, false], ({ title }, colors) => {
  test.serial(`Add colors unless "colors" is false | ${title}`, (t) => {
    t.is(
      hasAnsi(handleError(testError, { colors }).consoleArg),
      colors !== false,
    )
  })
})

test.serial('"colors" defaults to TTY color support', (t) => {
  t.false(hasAnsi(handleError(testError).consoleArg))
})

each(
  [
    { quote: '"', style: 'bold' },
    { quote: "'", style: 'bold' },
    { quote: '`', style: 'italic' },
  ],
  [true, false],
  ({ title }, { quote, style }, hasNewline) => {
    test.serial(`"colors" colorize quoted strings | ${title}`, (t) => {
      const newline = hasNewline ? '\n' : ''
      t.not(
        handleError(
          new Error(`a ${quote}b${newline}${quote} c ${quote}d${quote}`),
          { colors: true },
        ).consoleArg.includes(
          `a ${quote}${chalk[style]('b')}${newline}${quote} c ${quote}${chalk[
            style
          ]('d')}${quote}`,
        ),
        hasNewline,
      )
    })
  },
)

test.serial('"colors" does not colorize quoted strings in stack line', (t) => {
  const error = new Error('test')
  const stackLines = '    at "a"'
  error.stack = `Error: test\n${stackLines}`
  t.true(handleError(error, { colors: true }).consoleArg.endsWith(stackLines))
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
      t.true(consoleArg.includes(`"${chalk.bold('b')}"`))
    },
  )
})

test.serial(
  '"colors" does not colorize quoted strings without preview nor lines',
  (t) => {
    const error = new Error('test')
    error.stack = '"a"'
    t.true(
      handleError(error, { colors: true }).consoleArg.includes(
        `"${chalk.bold('a')}"`,
      ),
    )
  },
)
