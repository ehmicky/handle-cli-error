/**
 * `handle-cli-error` options
 */
export interface Options {
  /**
   * Process [exit code](https://en.wikipedia.org/wiki/Exit_status).
   *
   * Note: when passing invalid `options`, the exit code is always `125`.
   *
   * @default 1
   */
  readonly exitCode?: number

  /**
   * Log the `error` message only, not its stack trace.
   *
   * This is useful when the error was caused by the user (as opposed to being
   * an internal bug), in which cause the stack trace is not relevant to the
   * user.
   *
   * @default false
   */
  readonly short?: boolean

  /**
   * Exits the process without logging anything on the console.
   *
   * @default false
   */
  readonly silent?: boolean

  /**
   * The process exits gracefully: it waits for any ongoing tasks (callbacks,
   * promises, etc.) to complete, up to a specific `timeout`.
   *
   * Special values:
   *  - `0`: Exits right away, without waiting for ongoing tasks
   *  - `Number.POSITIVE_INFINITY`: Waits for ongoing tasks forever, without
   *    timing out
   *
   * @default 5000
   */
  readonly timeout?: number

  /**
   * Specify different options per error class. The object:
   *  - Keys are either the
   *    [`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name),
   *    or `"default"` (used if no `error.name` matches)
   *  - Values are options objects
   *
   * @default {}
   *
   * @example
   * ```js
   * handleCliError(error, {
   *   InputError: { exitCode: 1, short: true },
   *   DatabaseError: { exitCode: 2, short: true },
   *   default: { exitCode: 3 },
   * })
   * ```
   */
  readonly classes?: {
    readonly [errorName: string]: Omit<Options, 'classes'>
  }
}

/**
 * Prints `error` on the console (`stderr`) then exits the process.
 *
 * This never throws. Invalid `error`s are silently
 * [normalized](https://github.com/ehmicky/normalize-exception).
 *
 * @example
 * ```js
 * #!/usr/bin/env node
 * import handleCliError from 'handle-cli-error'
 *
 * const cliMain = function () {
 *   try {
 *     // ...
 *   } catch (error) {
 *     handleCliError(error) // Print `error` then exit the process
 *   }
 * }
 *
 * cliMain()
 * ```
 */
export default function handleCliError(error: unknown, options?: Options): void
