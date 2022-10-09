import { stderr } from 'process'

import colorsOption from 'colors-option'

// Compute the `colors` option, which defaults to `true` if the output supports
// colors.
export const getColors = function (colors) {
  const chalk = colorsOption({ colors, stream: stderr })
  const useColors = chalk.level !== 0
  return { chalk, useColors }
}

// When `colors` is true, add colors to quoted strings.
export const colorizeError = function (errorString, chalk, useColors) {
  if (!useColors) {
    return errorString
  }

  return errorString
    .replace(
      DOUBLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, chalk, 'bold'),
    )
    .replace(
      SINGLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, chalk, 'bold'),
    )
    .replace(
      BACKTICK_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, chalk, 'italic'),
    )
}

const DOUBLE_QUOTED_STRING = /(")([^"]+)(")/gu
const SINGLE_QUOTED_STRING = /(')([^']+)(')/gu
const BACKTICK_QUOTED_STRING = /(`)([^`]+)(`)/gu

// eslint-disable-next-line max-params
const colorizeQuotedString = function (
  chalk,
  style,
  fullString,
  startQuote,
  quotedString,
  endQuote,
) {
  return `${startQuote}${chalk[style](quotedString)}${endQuote}`
}
