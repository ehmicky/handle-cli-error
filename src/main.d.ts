export interface Options {
  /**
   *
   * @example
   * ```js
   * ```
   */
  readonly exitCode?: number

  /**
   *
   * @example
   * ```js
   * ```
   */
  readonly short?: boolean

  /**
   *
   * @example
   * ```js
   * ```
   */
  readonly silent?: boolean

  /**
   *
   * @example
   * ```js
   * ```
   */
  readonly timeout?: number

  /**
   *
   * @example
   * ```js
   * ```
   */
  readonly types?: {
    readonly [errorName in `${string}Error` | 'default']?: Omit<
      Options,
      'types'
    >
  }
}

/**
 *
 * @example
 * ```js
 * ```
 */
export default function handleCliError(error: unknown, options?: Options): void
