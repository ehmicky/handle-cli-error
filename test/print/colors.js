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
  ({ title }, { quote, style }) => {
    test.serial(`"colors" colorize quoted strings | ${title}`, (t) => {
      t.true(
        handleError(new Error(`a ${quote}b${quote} c ${quote}d${quote}`), {
          colors: true,
        }).consoleArg.includes(
          `a ${quote}${chalk[style]('b')}${quote} c ${quote}${chalk[style](
            'd',
          )}${quote}`,
        ),
      )
    })
  },
)
