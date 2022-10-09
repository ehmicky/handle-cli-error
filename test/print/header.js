import test from 'ava'
import colorsOption from 'colors-option'
import figures from 'figures'
import { each } from 'test-each'

import { handleError } from '../helpers/main.js'

const chalk = colorsOption({ colors: true })

each(
  [
    { header: undefined, style: 'red' },
    { header: 'bold', style: 'bold' },
  ],
  ({ title }, { header, style }) => {
    test.serial(`"header" is applied | ${title}`, (t) => {
      const error = new Error('test')
      const { consoleArg } = handleError(error, {
        icon: '',
        colors: true,
        header,
      })
      t.true(consoleArg.startsWith(chalk[style](`${error.name}:`)))
      t.pass()
    })
  },
)

each([{ colors: false }, { header: '' }], ({ title }, opts) => {
  test.serial(
    `"header" is not applied if empty or no colors | ${title}`,
    (t) => {
      const error = new Error('test')
      const { consoleArg } = handleError(error, {
        icon: '',
        colors: true,
        ...opts,
      })
      t.true(consoleArg.startsWith(`${error.name}:`))
      t.pass()
    },
  )
})

test.serial('"header" is not added to preview lines', (t) => {
  const error = new Error('test')
  const preview = 'preview'
  error.stack = `${preview}\n${error.stack}`
  const { consoleArg } = handleError(error, { colors: true })
  t.true(consoleArg.startsWith(preview))
})

test.serial('"header" works with empty messages', (t) => {
  const error = new Error('')
  const header = 'green'
  const { consoleArg } = handleError(error, { colors: true, icon: '', header })
  t.true(consoleArg.startsWith(chalk[header](error.name)))
})

test.serial('"header" colorizes the icon', (t) => {
  const error = new Error('test')
  const header = 'green'
  const { consoleArg } = handleError(error, {
    colors: true,
    icon: 'warning',
    header,
  })
  t.true(
    consoleArg.startsWith(chalk[header](`${figures.warning} ${error.name}:`)),
  )
})
