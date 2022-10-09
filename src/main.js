import normalizeException from 'normalize-exception'

import { exitProcess } from './exit.js'
import { getOpts } from './options/main.js'
import { printError } from './print/main.js'

export { validateOptions } from './options/validate.js'

// Print CLI errors and exit, depending on the error class
export default function handleCliError(error, opts) {
  const errorA = normalizeException(error)
  const {
    error: errorB,
    opts: { silent, stack, props, colors, icon, header, exitCode, timeout },
  } = getOpts(opts, errorA)
  printError({ error: errorB, silent, stack, props, colors, icon, header })
  exitProcess(exitCode, timeout)
}
