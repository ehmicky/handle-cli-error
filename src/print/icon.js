import figures from 'figures'

// Adds `icon` option before the error name
export const addIcon = (messageLines, icon) => {
  if (icon === '') {
    return messageLines
  }

  const [firstMessageLine, ...messageLinesA] = messageLines
  return [`${figures[icon]} ${firstMessageLine}`, ...messageLinesA]
}
