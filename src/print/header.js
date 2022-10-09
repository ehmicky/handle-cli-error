import { handleInvalidOpts } from '../options/invalid.js'

// Validate `header` option
export const validateHeader = function (value, optName) {
  if (value !== '' && typeof value !== 'string') {
    handleInvalidOpts('must be a style string', value, optName)
  }
}

// Apply `header` option to colorize the error's icon and name
export const applyHeader = function ({
  messageLines,
  header,
  useColors,
  chalk,
  error,
}) {
  if (header === '' || !useColors) {
    return messageLines
  }

  const [firstMessageLine, ...messageLinesA] = messageLines
  const firstMessageLineA = applyHeaderLine({
    firstMessageLine,
    header,
    chalk,
    error,
  })
  return [firstMessageLineA, ...messageLinesA]
}

const applyHeaderLine = function ({ firstMessageLine, header, chalk, error }) {
  const endIndex = getEndIndex(firstMessageLine, error)

  if (endIndex === -1) {
    return firstMessageLine
  }

  const start = firstMessageLine.slice(0, endIndex)
  const end = firstMessageLine.slice(endIndex)
  return `${chalk[header](start)}${end}`
}

const getEndIndex = function (firstMessageLine, error) {
  const endIndex = firstMessageLine.indexOf(':')

  if (endIndex !== -1) {
    return endIndex + 1
  }

  return firstMessageLine.endsWith(error.name)
    ? firstMessageLine.length
    : endIndex
}
