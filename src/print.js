// Print the error.
// If `stack: false`, we do not print the error `stack` nor inline preview,
// which is useful for well-known errors such as input validation.
// Otherwise, we pass the `error` instance to `console.error()`, so it prints
// not only its `message` and `stack` but also its properties, `cause`,
// aggregate `errors`, add colors, inline preview, etc. using `util.inspect()`.
export const printError = function (error, silent, stack) {
  if (silent) {
    return
  }

  const errorA = stack ? error : error.message
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(errorA)
}
