import { expectType } from 'tsd'

import handleCliError from './main.js'

expectType<void>(handleCliError(new Error('test')))
handleCliError('error')
handleCliError(undefined)
