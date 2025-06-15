import type { Options as BeautifulErrorOptions } from 'beautiful-error'

/**
 * Validate `handle-cli-error` options
 */
export function validateOptions(options: unknown): asserts options is Options

/**
 * `handle-cli-error` options
 */
export type Options = BeautifulErrorOptions & {
  /**
   * Process [exit code](https://en.wikipedia.org/wiki/Exit_status).
   *
   * We recommend values between 1 and 124 because the following exit codes have
   * some special meaning:
   *
   * - 0: success
   * - 125: invalid [`options`](#options)
   * - 126 to 255: used by shells like Bash
   *
   * @default 1
   */
  readonly exitCode?: number

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
   * Function used to print the error message.
   *
   * @default console.error
   */
  readonly log?: (message: string) => void

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
 * const cliMain = () => {
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
