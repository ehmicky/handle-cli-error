import test from 'ava'
import chalkString from 'chalk-string'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import { handleError } from '../helpers/main.test.js'

const testError = new TypeError('test')
const addStyles = chalkString({ colors: true })

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
    { quote: '"', styles: 'bold' },
    { quote: "'", styles: 'bold' },
    { quote: '`', styles: 'italic' },
  ],
  [true, false],
  ({ title }, { quote, styles }, hasNewline) => {
    test.serial(`"colors" colorize quoted strings | ${title}`, (t) => {
      const newline = hasNewline ? '\n' : ''
      const error = new Error(
        `a ${quote}b${newline}${quote} c ${quote}d${quote}`,
      )
      const { consoleArg } = handleError(error, { colors: true })
      t.not(
        consoleArg.includes(
          `a ${quote}${addStyles(
            styles,
            'b',
          )}${newline}${quote} c ${quote}${addStyles(styles, 'd')}${quote}`,
        ),
        hasNewline,
      )
    })
  },
)
