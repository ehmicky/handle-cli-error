// Print the error.
// If `short`, we only print the error `message`, which is useful for well-known
// errors such as input validation.
// Otherwise, we pass the `error` instance to `console.error()`, so it prints
// not only its `message` and `stack` but also its properties, `cause`,
// aggregate `errors`, add colors, etc.
//  - In Node.js, this is done by `util.inspect()`
//  - In browsers, this is also done, but differently
export const printError = function (error, silent, short) {
  if (silent) {
    return
  }

  const errorA = short ? error.message : error
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(errorA)
}
