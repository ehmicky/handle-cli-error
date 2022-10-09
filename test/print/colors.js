import test from 'ava'
import colorsOption from 'colors-option'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const testError = new TypeError('test')
const chalk = colorsOption({ colors: true })

each([true, false], ({ title }, colors) => {
  test.serial(`Add colors unless "colors" is false | ${title}`, (t) => {
    const { consoleArg } = handleError(testError, { colors })
    t.is(hasAnsi(consoleArg), colors !== false)
  })
})

test.serial('"colors" defaults to TTY color support', (t) => {
  const { consoleArg } = handleError(testError)
  t.false(hasAnsi(consoleArg))
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
      const error = new Error(
        `a ${quote}b${newline}${quote} c ${quote}d${quote}`,
      )
      const { consoleArg } = handleError(error, { colors: true })
      t.not(
        consoleArg.includes(
          `a ${quote}${chalk[style]('b')}${newline}${quote} c ${quote}${chalk[
            style
          ]('d')}${quote}`,
        ),
        hasNewline,
      )
    })
  },
)
