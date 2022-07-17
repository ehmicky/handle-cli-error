import {
  expectType,
  expectError,
  expectAssignable,
  expectNotAssignable,
} from 'tsd'

import handleCliError, { Options } from './main.js'

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

handleCliError('', { short: true })
expectAssignable<Options>({ short: true })
expectError(handleCliError('', { short: 'true' }))
expectNotAssignable<Options>({ short: 'true' })

handleCliError('', { silent: true })
expectAssignable<Options>({ silent: true })
expectError(handleCliError('', { silent: 'true' }))
expectNotAssignable<Options>({ silent: 'true' })

handleCliError('', { timeout: 0 })
expectAssignable<Options>({ timeout: 0 })
handleCliError('', { timeout: 1e3 })
expectAssignable<Options>({ timeout: 1e3 })
handleCliError('', { timeout: Number.POSITIVE_INFINITY })
expectAssignable<Options>({ timeout: Number.POSITIVE_INFINITY })
expectError(handleCliError('', { timeout: '0' }))
expectNotAssignable<Options>({ timeout: '0' })

handleCliError('', { types: {} })
expectAssignable<Options>({ types: {} })
expectError(handleCliError('', { types: true }))
expectNotAssignable<Options>({ types: true })

handleCliError('', { types: { Error: {} } })
expectAssignable<Options>({ types: { Error: {} } })
handleCliError('', { types: { TypeError: {} } })
expectAssignable<Options>({ types: { TypeError: {} } })
handleCliError('', { types: { default: {} } })
expectAssignable<Options>({ types: { default: {} } })
handleCliError('', { types: { error: {} } })
expectAssignable<Options>({ types: { error: {} } })
handleCliError('', { types: { other: {} } })
expectAssignable<Options>({ types: { other: {} } })

handleCliError('', { types: { default: { exitCode: 0 } } })
expectAssignable<Options>({ types: { default: { exitCode: 0 } } })
expectError(handleCliError('', { types: { default: { types: {} } } }))
expectNotAssignable<Options>({ types: { default: { types: {} } } })
expectNotAssignable<Options>({ types: { default: undefined } })
expectNotAssignable<Options>({ types: { Error: undefined } })
expectError(handleCliError('', { types: { default: { exitCode: '0' } } }))
expectNotAssignable<Options>({ types: { default: { exitCode: '0' } } })
