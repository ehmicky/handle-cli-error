import { install } from '@sinonjs/fake-timers'

// eslint-disable-next-line no-restricted-imports
import {
  NO_TIMEOUT,
  INFINITE_TIMEOUT,
  DEFAULT_TIMEOUT,
} from '../../src/timeout.js'

// Mock `setTimeout()` during tests
export const mockTimeout = function () {
  return install()
}

export const advanceTimeout = function (
  clock,
  { timeout = DEFAULT_TIMEOUT } = {},
) {
  if (timeout === NO_TIMEOUT || timeout === INFINITE_TIMEOUT) {
    return
  }

  clock.tick(timeout)
}

export const unmockTimeout = function (clock) {
  clock.uninstall()
}
