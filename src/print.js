// Print the error message and|or stack trace
export const printError = function (error, silent, short) {
  if (!silent) {
    // eslint-disable-next-line no-restricted-globals, no-console
    console.error(getErrorMessage(error, short))
  }
}

// `stack` does not contain `name` nor `message` in SpiderMonkey or
// JavaScriptCore. We make sure those are printed.
const getErrorMessage = function ({ name, message, stack }, short) {
  if (short) {
    return message
  }

  return stack.includes(name) && stack.includes(message)
    ? stack
    : `${name}: ${message}\n${stack}`
}
