import { stripVTControlCharacters } from 'node:util'

import { colorizeLine } from './colors.js'
import { applyHeader } from './header.js'
import { addIcon } from './icon.js'

// Apply the `colors` option to make the error prettier
export const prettifyError = ({
  error,
  errorString,
  addStyles,
  useColors,
  icon,
  header,
}) => {
  const lines = errorString.split('\n')
  const linesA = prettifyLines({
    error,
    lines,
    addStyles,
    useColors,
    icon,
    header,
  })
  return linesA.join('\n')
}

const prettifyLines = ({
  error,
  lines,
  addStyles,
  useColors,
  icon,
  header,
}) => {
  const { previewLines, messageLines, stackLines } = splitStack(lines, error)
  const messageLinesA = addIcon(messageLines, icon)
  const messageLinesB = applyHeader({
    messageLines: messageLinesA,
    header,
    useColors,
    addStyles,
    error,
  })
  const messageLinesC = messageLinesB.map((line) =>
    colorizeLine(line, useColors, addStyles),
  )
  return [...previewLines, ...messageLinesC, ...stackLines]
}

const splitStack = (lines, error) => {
  const messageLineIndex = lines.findIndex((line) => isMessageLine(line, error))
  const messageLineIndexA = messageLineIndex === -1 ? 0 : messageLineIndex
  const previewLines = lines.slice(0, messageLineIndexA)
  const messageLines = lines.slice(messageLineIndexA)

  const stackLineIndex = messageLines.findIndex(isStackLine)
  const stackLineIndexA =
    stackLineIndex === -1 ? messageLines.length : stackLineIndex
  const messageLinesA = messageLines.slice(0, stackLineIndexA)
  const stackLines = messageLines.slice(stackLineIndexA)

  return { previewLines, messageLines: messageLinesA, stackLines }
}

// Find first line with `error.name` and `error.message`, excluding the preview
// added by `--enable-source-maps`.
// When `error.name` does not match `error.constructor.name`, `util.inspect()`
// prints `{error.constructor.name} {error.name}`
const isMessageLine = (line, error) =>
  line === error.name ||
  line.startsWith(`${error.name}: `) ||
  line.startsWith(`${error.constructor.name} [`)

// Find first line with stack trace
const isStackLine = (line) =>
  stripVTControlCharacters(line).trimStart().startsWith('at ')
