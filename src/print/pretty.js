// Replace with `util.stripVTControlCharacters()` after dropping support for
// Node <16.11.0
import stripAnsi from 'strip-ansi'

import { colorizeLine } from './colors.js'
import { applyHeader } from './header.js'
import { addIcon } from './icon.js'

// Apply the `colors` option to make the error prettier
export const prettifyError = function ({
  error,
  errorString,
  chalk,
  useColors,
  icon,
  header,
}) {
  const lines = errorString.split('\n')
  const linesA = prettifyLines({ error, lines, chalk, useColors, icon, header })
  return linesA.join('\n')
}

const prettifyLines = function ({
  error,
  lines,
  chalk,
  useColors,
  icon,
  header,
}) {
  const { previewLines, messageLines, stackLines } = splitStack(lines, error)
  const messageLinesA = addIcon(messageLines, icon)
  const messageLinesB = applyHeader({
    messageLines: messageLinesA,
    header,
    useColors,
    chalk,
    error,
  })
  const messageLinesC = messageLinesB.map((line) =>
    colorizeLine(line, useColors, chalk),
  )
  return [...previewLines, ...messageLinesC, ...stackLines]
}

const splitStack = function (lines, error) {
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
const isMessageLine = function (line, error) {
  return (
    line.startsWith(`${error.name}: `) ||
    line.startsWith(`${error.constructor.name} [`)
  )
}

// Find first line with stack trace
const isStackLine = function (line) {
  return stripAnsi(line).trimStart().startsWith('at ')
}
