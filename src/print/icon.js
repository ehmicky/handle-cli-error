import figures from 'figures'

import { handleInvalidOpts } from '../options/invalid.js'

export const validateIcon = function (value, optName) {
  if (value !== '' && figures[value] === undefined) {
    handleInvalidOpts(
      `must be an icon name like "cross", "info" or "warning"`,
      value,
      optName,
    )
  }
}

// Adds `icon` option before the error name
export const addIcon = function (messageLines, icon) {
  if (icon === '') {
    return messageLines
  }

  const [firstMessageLine, ...messageLinesA] = messageLines
  return [`${figures[icon]} ${firstMessageLine}`, ...messageLinesA]
}
