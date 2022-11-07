import {
  expectType,
  expectError,
  expectAssignable,
  expectNotAssignable,
} from 'tsd'

import handleCliError, { Options } from 'handle-cli-error'

expectType<void>(handleCliError(new Error('test')))
handleCliError('error')
handleCliError(undefined)

handleCliError('', {})
expectAssignable<Options>({})
expectError(handleCliError('', true))
expectNotAssignable<Options>(true)

handleCliError('', { exitCode: 0 })
expectAssignable<Options>({ exitCode: 0 })
expectError(handleCliError('', { exitCode: '0' }))
expectNotAssignable<Options>({ exitCode: '0' })

handleCliError('', { stack: true })
expectAssignable<Options>({ stack: true })
expectError(handleCliError('', { stack: 'true' }))
expectNotAssignable<Options>({ stack: 'true' })

handleCliError('', { props: true })
expectAssignable<Options>({ props: true })
expectError(handleCliError('', { props: 'true' }))
expectNotAssignable<Options>({ props: 'true' })

handleCliError('', { silent: true })
expectAssignable<Options>({ silent: true })
expectError(handleCliError('', { silent: 'true' }))
expectNotAssignable<Options>({ silent: 'true' })

handleCliError('', { colors: true })
expectAssignable<Options>({ colors: true })
expectError(handleCliError('', { colors: 'true' }))
expectNotAssignable<Options>({ colors: 'true' })

handleCliError('', { icon: '' })
expectAssignable<Options>({ icon: '' })
handleCliError('', { icon: 'warning' })
expectAssignable<Options>({ icon: 'warning' })
expectError(handleCliError('', { icon: 'warn' }))
expectNotAssignable<Options>({ icon: 'warn' })
expectError(handleCliError('', { icon: true }))
expectNotAssignable<Options>({ icon: true })

handleCliError('', { header: '' })
expectAssignable<Options>({ header: '' })
handleCliError('', { header: 'red bold' })
expectAssignable<Options>({ header: 'red bold' })
expectError(handleCliError('', { header: true }))
expectNotAssignable<Options>({ header: true })
expectError(handleCliError('', { header: 'unknown' }))
expectNotAssignable<Options>({ header: 'unknown' })

handleCliError('', { timeout: 0 })
expectAssignable<Options>({ timeout: 0 })
handleCliError('', { timeout: 1e3 })
expectAssignable<Options>({ timeout: 1e3 })
handleCliError('', { timeout: Number.POSITIVE_INFINITY })
expectAssignable<Options>({ timeout: Number.POSITIVE_INFINITY })
expectError(handleCliError('', { timeout: '0' }))
expectNotAssignable<Options>({ timeout: '0' })

handleCliError('', { classes: {} })
expectAssignable<Options>({ classes: {} })
expectError(handleCliError('', { classes: true }))
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
expectError(handleCliError('', { classes: { default: { classes: {} } } }))
expectNotAssignable<Options>({ classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: undefined } })
expectNotAssignable<Options>({ classes: { Error: undefined } })
expectError(handleCliError('', { classes: { default: { exitCode: '0' } } }))
expectNotAssignable<Options>({ classes: { default: { exitCode: '0' } } })
