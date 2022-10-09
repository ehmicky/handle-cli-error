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

  if (messageLines === undefined) {
    return lines
  }

  const messageLinesA = messageLines.map((line) =>
    colorizeLine(line, useColors, chalk),
  )
  return [...previewLines, ...messageLinesA, ...stackLines]
}

const splitStack = function (lines, error) {
  const firstLineIndex = lines.findIndex((line) => isFirstLine(line, error))

  if (firstLineIndex === -1) {
    return {}
  }

  const lastLineIndex = lines.findIndex(isLastLine)

  if (lastLineIndex === -1) {
    return {}
  }

  const previewLines = lines.slice(0, firstLineIndex)
  const messageLines = lines.slice(firstLineIndex, lastLineIndex)
  const stackLines = lines.slice(lastLineIndex)
  return { previewLines, messageLines, stackLines }
}

// Find first line with `error.name` and `error.message`, excluding the preview
// added by `--enable-source-maps`
const isFirstLine = function (line, error) {
  return (
    line.startsWith(`${error.name}: `) ||
    line.startsWith(`${error.constructor.name} [`)
  )
}

// Find first line with stack trace
const isLastLine = function (line) {
  return stripAnsi(line).trimStart().startsWith('at ')
}
