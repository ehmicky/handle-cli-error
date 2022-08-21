import isPlainObj from 'is-plain-obj'

import { removeUndefined } from './default.js'
import { handleInvalidOpts } from './validate.js'

// `options.classes.{ErrorName}.*` is like `options.*` but only applies if
// `error.name` matches.
export const applyClassesOpts = function ({ classes = {}, ...opts }, error) {
  if (!isPlainObj(classes)) {
    return handleInvalidOpts(
      `options.classes must be a plain object: ${classes}`,
    )
  }

  const classesOpts = findClassesOpts(classes, error)

  if (classesOpts === undefined) {
    return opts
  }

  if (!isPlainObj(classesOpts)) {
    return handleInvalidOpts(
      `options.classes.* must be a plain object: ${classesOpts}`,
    )
  }

  return { ...opts, ...removeUndefined(classesOpts) }
}

const findClassesOpts = function (classes, error) {
  return classes[error.name] || classes.default
}
