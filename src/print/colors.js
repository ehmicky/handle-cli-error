import { stderr } from 'process'

import colorsOption from 'colors-option'

// Compute the `colors` option, which defaults to `true` if the output supports
// colors.
export const getColors = function (colors) {
  const chalk = colorsOption({ colors, stream: stderr })
  const useColors = chalk.level !== 0
  return { chalk, useColors }
}

// When `colors` is true, add colors to quoted strings
export const colorizeError = function (errorString, chalk, useColors) {
  return errorString
}
