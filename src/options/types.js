import isPlainObj from 'is-plain-obj'

import { removeUndefined } from './default.js'
import { handleInvalidOpts } from './validate.js'

// `options.types.{ErrorName}.*` is like `options.*` but only applies if
// `error.name` matches.
export const applyTypesOpts = function ({ types = {}, ...opts }, error) {
  if (!isPlainObj(types)) {
    handleInvalidOpts(`options.types must be a plain object: ${types}`)
    return
  }

  const typesOpts = findTypesOpts(types, error)

  if (typesOpts === undefined) {
    return opts
  }

  if (!isPlainObj(typesOpts)) {
    handleInvalidOpts(`options.types.* must be a plain object: ${typesOpts}`)
    return
  }

  return { ...opts, ...removeUndefined(typesOpts) }
}

const findTypesOpts = function (types, error) {
  return types[error.name] || types.default
}
