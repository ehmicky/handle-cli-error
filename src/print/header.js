// Apply `header` option to colorize the error's icon and name
export const applyHeader = ({
  messageLines,
  header,
  useColors,
  addStyles,
  error,
}) => {
  if (header === '' || !useColors) {
    return messageLines
  }

  const [firstMessageLine, ...messageLinesA] = messageLines
  const firstMessageLineA = applyHeaderLine({
    firstMessageLine,
    header,
    addStyles,
    error,
  })
  return [firstMessageLineA, ...messageLinesA]
}

const applyHeaderLine = ({ firstMessageLine, header, addStyles, error }) => {
  const endIndex = getEndIndex(firstMessageLine, error)

  if (endIndex === -1) {
    return firstMessageLine
  }

  const start = firstMessageLine.slice(0, endIndex)
  const end = firstMessageLine.slice(endIndex)
  return `${addStyles(header, start)}${end}`
}

const getEndIndex = (firstMessageLine, error) => {
  const endIndex = firstMessageLine.indexOf(':')

  if (endIndex !== -1) {
    return endIndex + 1
  }

  return firstMessageLine.endsWith(error.name)
    ? firstMessageLine.length
    : endIndex
}
