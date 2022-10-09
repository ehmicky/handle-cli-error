import { stderr } from 'process'

import chalkString from 'chalk-string'

// Compute the `colors` option, which defaults to `true` if the output supports
// colors.
export const getColors = function (colors) {
  const addStyles = chalkString({ colors, stream: stderr })
  const useColors = addStyles.level !== 0
  return { addStyles, useColors }
}

// When `colors` is true, add colors to quoted strings.
// `util.inspect()` strips ANSI sequences, so this must be done on the
// serialized output.
export const colorizeLine = function (line, useColors, addStyles) {
  if (!useColors) {
    return line
  }

  return line
    .replace(
      DOUBLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, addStyles, 'bold'),
    )
    .replace(
      SINGLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, addStyles, 'bold'),
    )
    .replace(
      BACKTICK_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, addStyles, 'italic'),
    )
}

const DOUBLE_QUOTED_STRING = /(")([^"]+)(")/gu
const SINGLE_QUOTED_STRING = /(')([^']+)(')/gu
const BACKTICK_QUOTED_STRING = /(`)([^`]+)(`)/gu

// eslint-disable-next-line max-params
const colorizeQuotedString = function (
  addStyles,
  styles,
  fullString,
  startQuote,
  quotedString,
  endQuote,
) {
  return `${startQuote}${addStyles(styles, quotedString)}${endQuote}`
}
