import normalizeException from 'normalize-exception'

import { exitProcess } from './exit.js'
import { getOpts } from './options/main.js'

// Print CLI errors and exit, depending on the error type
export default function handleCliError(error, opts) {
  const errorA = normalizeException(error)
  const { silent, short, exitCode, timeout } = getOpts(errorA, opts)
  printError(errorA, silent, short)
  exitProcess(exitCode, timeout)
}

// Print the error message and|or stack trace
const printError = function (error, silent, short) {
  if (silent) {
    return
  }

  const errorMessage = short ? error.message : error.stack
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(errorMessage)
}
