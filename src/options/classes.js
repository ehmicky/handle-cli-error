import isPlainObj from 'is-plain-obj'

import { removeUndefined } from './default.js'
import { handleInvalidOpts } from './invalid.js'

// Validate `classes` option
export const validateClasses = function (classes, optName, validateAllOpts) {
  if (!isPlainObj(classes)) {
    handleInvalidOpts('must be a plain object', classes, optName)
  }

  if (optName.length > 1) {
    handleInvalidOpts('must not be defined', classes, optName)
  }

  Object.entries(classes).forEach(([className, classOpts]) => {
    validateAllOpts(classOpts, [...optName, className])
  })
}

// `options.classes.{ErrorName}.*` is like `options.*` but only applies if
// `error.name` matches.
export const applyClassesOpts = function (
  { name },
  { classes = {}, ...opts } = {},
) {
  const classesOpts = classes[name] || classes.default || {}
  return { ...opts, ...removeUndefined(classesOpts) }
}
