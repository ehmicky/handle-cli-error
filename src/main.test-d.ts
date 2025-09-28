import handleCliError, { validateOptions, type Options } from 'handle-cli-error'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

expectType<void>(handleCliError(new Error('test')))
handleCliError('error')
handleCliError(undefined)

handleCliError('', {})
expectAssignable<Options>({})
// @ts-expect-error
handleCliError('', true)
expectNotAssignable<Options>(true)

handleCliError('', { stack: true })
expectAssignable<Options>({ stack: true })
// @ts-expect-error
handleCliError('', { stack: 'true' })
expectNotAssignable<Options>({ stack: 'true' })

handleCliError('', { cause: true })
expectAssignable<Options>({ cause: true })
// @ts-expect-error
handleCliError('', { cause: 'true' })
expectNotAssignable<Options>({ cause: 'true' })

handleCliError('', { exitCode: 0 })
expectAssignable<Options>({ exitCode: 0 })
// @ts-expect-error
handleCliError('', { exitCode: '0' })
expectNotAssignable<Options>({ exitCode: '0' })

handleCliError('', { silent: true })
expectAssignable<Options>({ silent: true })
// @ts-expect-error
handleCliError('', { silent: 'true' })
expectNotAssignable<Options>({ silent: 'true' })

handleCliError('', { timeout: 0 })
expectAssignable<Options>({ timeout: 0 })
handleCliError('', { timeout: 1e3 })
expectAssignable<Options>({ timeout: 1e3 })
handleCliError('', { timeout: Number.POSITIVE_INFINITY })
expectAssignable<Options>({ timeout: Number.POSITIVE_INFINITY })
// @ts-expect-error
handleCliError('', { timeout: '0' })
expectNotAssignable<Options>({ timeout: '0' })

handleCliError('', { log: () => {} })
expectAssignable<Options>({ log: () => {} })
handleCliError('', { log: (message: string) => {} })
expectAssignable<Options>({ log: (message: string) => {} })
handleCliError('', { log: (message: unknown) => {} })
expectAssignable<Options>({ log: (message: unknown) => {} })
handleCliError('', { log: (message: string) => true })
expectAssignable<Options>({ log: (message: string) => true })
// eslint-disable-next-line no-console, no-restricted-globals
handleCliError('', { log: console.log })
// eslint-disable-next-line no-console, no-restricted-globals
expectAssignable<Options>({ log: console.log })
// @ts-expect-error
handleCliError('', { log: 0 })
expectNotAssignable<Options>({ log: 0 })
// @ts-expect-error
handleCliError('', { log: (message: boolean) => {} })
expectNotAssignable<Options>({ log: (message: boolean) => {} })
// @ts-expect-error
handleCliError('', { log: (message: string, second: boolean) => {} })
expectNotAssignable<Options>({ log: (message: string, second: boolean) => {} })

handleCliError('', { classes: {} })
expectAssignable<Options>({ classes: {} })
// @ts-expect-error
handleCliError('', { classes: true })
expectNotAssignable<Options>({ classes: true })

handleCliError('', { classes: { Error: {} } })
expectAssignable<Options>({ classes: { Error: {} } })
handleCliError('', { classes: { TypeError: {} } })
expectAssignable<Options>({ classes: { TypeError: {} } })
handleCliError('', { classes: { default: {} } })
expectAssignable<Options>({ classes: { default: {} } })
handleCliError('', { classes: { error: {} } })
expectAssignable<Options>({ classes: { error: {} } })
handleCliError('', { classes: { other: {} } })
expectAssignable<Options>({ classes: { other: {} } })

handleCliError('', { classes: { default: { exitCode: 0 } } })
expectAssignable<Options>({ classes: { default: { exitCode: 0 } } })
handleCliError('', { classes: { default: { stack: true } } })
expectAssignable<Options>({ classes: { default: { stack: true } } })
// @ts-expect-error
handleCliError('', { classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: undefined } })
expectNotAssignable<Options>({ classes: { Error: undefined } })
// @ts-expect-error
handleCliError('', { classes: { default: { exitCode: '0' } } })
expectNotAssignable<Options>({ classes: { default: { exitCode: '0' } } })
// @ts-expect-error
handleCliError('', { classes: { default: { stack: 0 } } })
expectNotAssignable<Options>({ classes: { default: { stack: 0 } } })

expectType<void>(validateOptions({}))
validateOptions(0)
// @ts-expect-error
validateOptions()
