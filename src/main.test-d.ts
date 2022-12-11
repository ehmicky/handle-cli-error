import handleCliError, { validateOptions, type Options } from 'handle-cli-error'
import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

expectType<void>(handleCliError(new Error('test')))
handleCliError('error')
handleCliError(undefined)

handleCliError('', {})
expectAssignable<Options>({})
// @ts-expect-error
handleCliError('', true)
expectNotAssignable<Options>(true)

handleCliError('', { exitCode: 0 })
expectAssignable<Options>({ exitCode: 0 })
// @ts-expect-error
handleCliError('', { exitCode: '0' })
expectNotAssignable<Options>({ exitCode: '0' })

handleCliError('', { stack: true })
expectAssignable<Options>({ stack: true })
// @ts-expect-error
handleCliError('', { stack: 'true' })
expectNotAssignable<Options>({ stack: 'true' })

handleCliError('', { props: true })
expectAssignable<Options>({ props: true })
// @ts-expect-error
handleCliError('', { props: 'true' })
expectNotAssignable<Options>({ props: 'true' })

handleCliError('', { silent: true })
expectAssignable<Options>({ silent: true })
// @ts-expect-error
handleCliError('', { silent: 'true' })
expectNotAssignable<Options>({ silent: 'true' })

handleCliError('', { colors: true })
expectAssignable<Options>({ colors: true })
// @ts-expect-error
handleCliError('', { colors: 'true' })
expectNotAssignable<Options>({ colors: 'true' })

handleCliError('', { icon: '' })
expectAssignable<Options>({ icon: '' })
handleCliError('', { icon: 'warning' })
expectAssignable<Options>({ icon: 'warning' })
// @ts-expect-error
handleCliError('', { icon: 'warn' })
expectNotAssignable<Options>({ icon: 'warn' })
// @ts-expect-error
handleCliError('', { icon: true })
expectNotAssignable<Options>({ icon: true })

handleCliError('', { header: '' })
expectAssignable<Options>({ header: '' })
handleCliError('', { header: 'red bold' })
expectAssignable<Options>({ header: 'red bold' })
// @ts-expect-error
handleCliError('', { header: true })
expectNotAssignable<Options>({ header: true })
// @ts-expect-error
handleCliError('', { header: 'unknown' })
expectNotAssignable<Options>({ header: 'unknown' })

handleCliError('', { timeout: 0 })
expectAssignable<Options>({ timeout: 0 })
handleCliError('', { timeout: 1e3 })
expectAssignable<Options>({ timeout: 1e3 })
handleCliError('', { timeout: Number.POSITIVE_INFINITY })
expectAssignable<Options>({ timeout: Number.POSITIVE_INFINITY })
// @ts-expect-error
handleCliError('', { timeout: '0' })
expectNotAssignable<Options>({ timeout: '0' })

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
// @ts-expect-error
handleCliError('', { classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: undefined } })
expectNotAssignable<Options>({ classes: { Error: undefined } })
// @ts-expect-error
handleCliError('', { classes: { default: { exitCode: '0' } } })
expectNotAssignable<Options>({ classes: { default: { exitCode: '0' } } })

expectType<void>(validateOptions({}))
validateOptions(0)
// @ts-expect-error
validateOptions()
