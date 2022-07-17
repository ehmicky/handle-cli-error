import normalizeException from 'normalize-exception'

import { exitProcess } from './exit.js'
import { getOpts } from './options/main.js'
import { printError } from './print.js'

// Print CLI errors and exit, depending on the error type
export default function handleCliError(error, opts) {
  const errorA = normalizeException(error)
  const {
    error: errorB,
    opts: { silent, short, exitCode, timeout },
  } = getOpts(errorA, opts)
  printError(errorB, silent, short)
  exitProcess(exitCode, timeout)
}
