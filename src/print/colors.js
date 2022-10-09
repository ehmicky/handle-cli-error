import { stderr } from 'process'

import colorsOption from 'colors-option'
// Replace with `util.stripVTControlCharacters()` after dropping support for
// Node <16.11.0
import stripAnsi from 'strip-ansi'

// Compute the `colors` option, which defaults to `true` if the output supports
// colors.
export const getColors = function (colors) {
  const chalk = colorsOption({ colors, stream: stderr })
  const useColors = chalk.level !== 0
  return { chalk, useColors }
}

// When `colors` is true, add colors to quoted strings.
// `util.inspect()` strips ANSI sequences, so this must be done on the
// serialized output.
export const colorizeError = function ({
  error,
  errorString,
  chalk,
  useColors,
}) {
  if (!useColors) {
    return errorString
  }

  const lines = errorString.split('\n')
  const firstLineIndex = lines.findIndex((line) => isFirstLine(line, error))

  if (firstLineIndex === -1) {
    return lines.join('\n')
  }

  const lastLineIndex = lines.findIndex(isLastLine)

  if (lastLineIndex === -1) {
    return lines.join('\n')
  }

  const previewLines = lines.slice(0, firstLineIndex)
  const messageLines = lines
    .slice(firstLineIndex, lastLineIndex)
    .map((line) => colorizeLine(line, chalk))
  const stackLines = lines.slice(lastLineIndex)
  return [...previewLines, ...messageLines, ...stackLines].join('\n')
}

// Find first line with `error.name` and `error.message`, excluding the preview
// added by `--enable-source-maps`
const isFirstLine = function (line, error) {
  return line.startsWith(`${error.name}: `)
}

// Find first line with stack trace
const isLastLine = function (line) {
  return stripAnsi(line).trimStart().startsWith('at ')
}

const colorizeLine = function (line, chalk) {
  return line
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
