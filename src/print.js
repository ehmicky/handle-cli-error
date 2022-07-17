// Print the error message and|or stack trace
export const printError = function (error, silent, short) {
  if (silent) {
    return
  }

  const errorMessage = short ? error.message : error.stack
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(errorMessage)
}
