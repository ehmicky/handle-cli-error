import test from 'ava'
import chalkString from 'chalk-string'
import figures from 'figures'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const addStyles = chalkString({ colors: true })
const testOpts = { icon: '', colors: true }

each(
  [
    { header: undefined, styles: 'red bold' },
    { header: 'bold', styles: 'bold' },
    { header: 'red bold', styles: 'red bold' },
  ],
  ({ title }, { header, styles }) => {
    test.serial(`"header" is applied | ${title}`, (t) => {
      const error = new Error('test')
      const { consoleArg } = handleError(error, { ...testOpts, header })
      t.true(consoleArg.includes(addStyles(styles, `${error.name}:`)))
      t.pass()
    })
  },
)

each([{ colors: false }, { header: '' }], ({ title }, opts) => {
  test.serial(
    `"header" is not applied if empty or no colors | ${title}`,
    (t) => {
      const error = new Error('test')
      const { consoleArg } = handleError(error, { ...testOpts, ...opts })
      t.true(consoleArg.includes(`${error.name}: `))
      t.pass()
    },
  )
})

test.serial('"header" is not added to preview lines', (t) => {
  const error = new Error('test')
  const preview = 'preview'
  error.stack = `${preview}\n${error.stack}`
  const { consoleArg } = handleError(error, testOpts)
  t.true(consoleArg.startsWith(preview))
})

test.serial('"header" works with empty messages', (t) => {
  const error = new Error('')
  const header = 'green'
  const { consoleArg } = handleError(error, { ...testOpts, header })
  t.true(consoleArg.includes(addStyles(header, error.name)))
})

test.serial('"header" colorizes the icon', (t) => {
  const error = new Error('test')
  const header = 'green'
  const { consoleArg } = handleError(error, {
    ...testOpts,
    icon: 'warning',
    header,
  })
  t.true(
    consoleArg.includes(addStyles(header, `${figures.warning} ${error.name}:`)),
  )
})
