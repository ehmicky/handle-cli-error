import test from 'ava'
import { each } from 'test-each'

import { handleError } from '../helpers/main.test.js'

const propsError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
propsError.prop = 'propValue'

each(
  [true, false, undefined],
  [true, false, undefined],
  ({ title }, stack, props) => {
    test.serial(`Prints properties unless "props" is false | ${title}`, (t) => {
      const { consoleArg } = handleError(propsError, { stack, props })
      t.is(consoleArg.includes(propsError.prop), props !== false)
    })
  },
)
