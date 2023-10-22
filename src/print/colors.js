import { stderr } from 'node:process'

import chalkString from 'chalk-string'

// Compute the `colors` option, which defaults to `true` if the output supports
// colors.
export const getColors = (colors) => {
  const addStyles = chalkString({ colors, stream: stderr })
  const useColors = addStyles('red', '_') !== '_'
  return { addStyles, useColors }
}

// When `colors` is true, add colors to quoted strings.
// `util.inspect()` strips ANSI sequences, so this must be done on the
// serialized output.
export const colorizeLine = (line, useColors, addStyles) => {
  if (!useColors) {
    return line
  }

  return line
    .replaceAll(
      DOUBLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, addStyles, 'bold'),
    )
    .replaceAll(
      SINGLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, addStyles, 'bold'),
    )
    .replaceAll(
      BACKTICK_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, addStyles, 'italic'),
    )
}

const DOUBLE_QUOTED_STRING = /(")([^"]+)(")/gu
const SINGLE_QUOTED_STRING = /(')([^']+)(')/gu
const BACKTICK_QUOTED_STRING = /(`)([^`]+)(`)/gu

const colorizeQuotedString = (
  addStyles,
  styles,
  fullString,
  startQuote,
  quotedString,
  endQuote,
  // eslint-disable-next-line max-params
) => `${startQuote}${addStyles(styles, quotedString)}${endQuote}`
