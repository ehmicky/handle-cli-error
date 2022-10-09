import { stderr } from 'process'

import colorsOption from 'colors-option'

export const getColors = function (colors) {
  const chalk = colorsOption({ colors, stream: stderr })
  const useColors = chalk.level !== 0
  return { useColors }
}
