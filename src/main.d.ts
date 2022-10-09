import figures from 'figures'

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
   * Whether to log the `error` stack trace.
   *
   * @default true
   */
  readonly stack?: boolean

  /**
   * Whether to log the error's additional properties.
   *
   * @default true
   */
  readonly props?: boolean

  /**
   * Exits the process without logging anything on the console.
   *
   * @default false
   */
  readonly silent?: boolean

  /**
   * Whether to colorize the error's message, stack trace and additional properties.
   *
   * Quoted strings in the error's message are printed in bold (for `"..."` and
   * `'...'`) and in italic (for `` `...` ``).
   *
   * @default `true` in terminals, `false` otherwise
   */
  readonly colors?: boolean

  /**
   * Icon prepended to the error's name. The available values are listed
   * [here](https://github.com/sindresorhus/figures/blob/main/readme.md#figures-1).
   *
   * This can be disabled by passing an empty string.
   *
   * @default 'cross'
   */
  readonly icon?: keyof typeof figures | ''

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
   *   InputError: { exitCode: 1, stack: false },
   *   DatabaseError: { exitCode: 2, stack: false },
   *   default: { exitCode: 3 },
   * })
   * ```
   */
  readonly classes?: {
    readonly [errorName: string]: Omit<Options, 'classes'>
  }
}

/**
 * Logs `error` on the console (`stderr`) then exits the process.
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
 *     handleCliError(error) // Logs `error` then exit the process
 *   }
 * }
 *
 * cliMain()
 * ```
 */
export default function handleCliError(error: unknown, options?: Options): void
