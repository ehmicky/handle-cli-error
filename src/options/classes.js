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

  return { ...optsA, ...removeUndefined(classesOpts) }
}

export const validateObject = (value, optName) => {
  if (!isPlainObj(value)) {
    throw new Error(`"${optName}" must be a plain object: ${value}`)
  }
}
