import test from 'ava'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const propsError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
propsError.prop = 'propValue'

each(
  [true, false, undefined],
  [true, false, undefined],
  ({ title }, stack, props) => {
    test.serial(`Prints properties unless "props" is false | ${title}`, (t) => {
      t.is(
        handleError(propsError, { stack, props }).consoleArg.includes(
          propsError.prop,
        ),
        props !== false,
      )
    })
  },
)
