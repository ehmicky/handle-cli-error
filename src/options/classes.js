import isPlainObj from 'is-plain-obj'

import { removeUndefined } from './default.js'

// `options.classes.{ErrorName}.*` is like `options.*` but only applies if
// `error.name` matches.
export const applyClassesOpts = (name, opts = {}) => {
  if (!isPlainObj(opts)) {
    throw new Error(`options must be a plain object: ${opts}`)
  }

  const { classes = {}, ...optsA } = opts
  validateObject(classes, 'classes')

  const classesOpts = classes[name] || classes.default || {}
  validateObject(classesOpts, `classes.${name}`)

  const beautifulErrorOpts = {
    ...splitOpts(optsA).beautifulErrorOpts,
    classes: Object.fromEntries(
      Object.entries(classes).map(pickBeautifulErrorOpts),
    ),
  }
  const optsB = splitOpts({
    ...optsA,
    ...removeUndefined(classesOpts),
  }).opts
  return { opts: optsB, beautifulErrorOpts }
}

export const validateObject = (value, optName) => {
  if (!isPlainObj(value)) {
    throw new Error(`"${optName}" must be a plain object: ${value}`)
  }
}

const pickBeautifulErrorOpts = ([name, opts]) => [
  name,
  splitOpts(opts).beautifulErrorOpts,
]

const splitOpts = ({
  silent,
  exitCode,
  timeout,
  log,
  ...beautifulErrorOpts
}) => ({ opts: { silent, exitCode, timeout, log }, beautifulErrorOpts })
