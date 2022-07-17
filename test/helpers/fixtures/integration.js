import { argv } from 'process'

import handleCliError from 'handle-cli-error'

const main = function () {
  const handlerTimeout = Number(argv[2])
  const logicTimeout = Number(argv[3])

  try {
    runFunc(logicTimeout)
  } catch (error) {
    handleCliError(error, { timeout: handlerTimeout })
  }
}

const runFunc = function (logicTimeout) {
  setTimeout(noop, logicTimeout)
  throw new Error('test')
}

const noop = function () {}

main()
