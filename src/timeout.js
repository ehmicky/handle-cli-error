// Validate `timeout` option
export const validateTimeout = (timeout, optName) => {
  if (
    (!Number.isInteger(timeout) || timeout <= 0) &&
    !isSpecialTimeout(timeout)
  ) {
    throw new Error(
      `"${optName}" must be 0, a positive integer or Infinity: ${timeout}`,
    )
  }
}

const isSpecialTimeout = (timeout) =>
  timeout === INFINITE_TIMEOUT || timeout === NO_TIMEOUT

// Wait for a timeout to complete.
// We still recommend users to perform cleanup logic in try/catch blocks,
// preventing the need for this option.
// eslint-disable-next-line promise/prefer-await-to-callbacks
export const waitForTimeout = (timeout, callback) => {
  if (timeout === NO_TIMEOUT) {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    callback()
    return
  }

  if (timeout === INFINITE_TIMEOUT) {
    return
  }

  setTimeout(callback, timeout).unref()
}

// `options.timeout` value that disables waiting on exit
export const NO_TIMEOUT = 0
// `options.timeout` value that disables timing out while waiting
export const INFINITE_TIMEOUT = Number.POSITIVE_INFINITY
// `options.timeout` default value
export const DEFAULT_TIMEOUT = 5e3
