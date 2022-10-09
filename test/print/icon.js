import test from 'ava'
import figures from 'figures'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

each(
  [
    { icon: '', output: '' },
    { icon: undefined, output: `${figures.cross} ` },
    { icon: 'warning', output: `${figures.warning} ` },
  ],
  ({ title }, { icon, output }) => {
    test.serial(`"icon" prepends an icon | ${title}`, (t) => {
      const error = new Error('test')
      const { consoleArg } = handleError(error, { icon })
      t.true(consoleArg.startsWith(`${output}${error.name}`))
    })
  },
)

test.serial('"icon" is not added to preview lines', (t) => {
  const error = new Error('test')
  error.stack = `preview\n${error.stack}`
  const { consoleArg } = handleError(error, { icon: 'warning' })
  t.true(consoleArg.includes(`${figures.warning} ${error.name}`))
})
