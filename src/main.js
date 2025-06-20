import beautifulError from 'beautiful-error'
import normalizeException from 'normalize-exception'

import { exitProcess } from './exit.js'
import { getOpts } from './options/main.js'

export { validateOptions } from './options/validate.js'

// Print CLI errors and exit, depending on the error class
const handleCliError = (error, opts) => {
  const errorA = normalizeException(error)
  const {
    error: errorB,
    opts: { silent, exitCode, timeout, log },
    beautifulErrorOpts,
  } = getOpts(errorA, opts)

  printError({ error: errorB, silent, log, beautifulErrorOpts })
  exitProcess(exitCode, timeout)
}

// We pass the `error` instance to `console.error()`, so it prints not only its
// `message` and `stack` but also its properties, `cause`, aggregate `errors`,
// add colors, inline preview, etc. using `util.inspect()`
const printError = ({ error, silent, log, beautifulErrorOpts }) => {
  if (silent) {
    return
  }

  const errorString = beautifulError(error, beautifulErrorOpts)
  log(errorString)
}

export default handleCliError
