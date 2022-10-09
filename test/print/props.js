import test from 'ava'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const propsError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
propsError.prop = 'propValue'

each([true, false], [true, false], ({ title }, stack, props) => {
  test.serial(`Prints properties providing "props" is true | ${title}`, (t) => {
    t.is(
      handleError(propsError, { stack, props }).consoleArg.includes(
        propsError.prop,
      ),
      props,
    )
  })
})

test.serial('Print properties by default', (t) => {
  t.true(handleError(propsError).consoleArg.includes(propsError.prop))
})
