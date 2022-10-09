// Replace with `util.stripVTControlCharacters()` after dropping support for
// Node <16.11.0
import stripAnsi from 'strip-ansi'

import { colorizeLine } from './colors.js'

export const prettifyError = function ({
  error,
  errorString,
  chalk,
  useColors,
}) {
  const lines = errorString.split('\n')
  const linesA = prettifyLines({ error, lines, chalk, useColors })
  return linesA.join('\n')
}

const prettifyLines = function ({ error, lines, chalk, useColors }) {
  const { previewLines, messageLines, stackLines } = splitStack(lines, error)
  const messageLinesA = messageLines.map((line) =>
    colorizeLine(line, useColors, chalk),
  )
  return [...previewLines, ...messageLinesA, ...stackLines]
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
// added by `--enable-source-maps`
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
