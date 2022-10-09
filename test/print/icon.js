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
      t.true(
        handleError(error, { icon }).consoleArg.startsWith(
          `${output}${error.name}`,
        ),
      )
    })
  },
)

test.serial('"icon" is not added to preview lines', (t) => {
  const error = new Error('test')
  error.stack = `preview\n${error.stack}`
  t.true(
    handleError(error, { icon: 'warning' }).consoleArg.includes(
      `${figures.warning} ${error.name}`,
    ),
  )
})
