// If `props` is `false`, we do not print error properties.
//  - Including `cause` and `errors`
// This requires creating a copy of `error` with only `name`, `message`,
// `stack` and `__proto__`. This allows using using `util.inspect()` to:
//  - Keep stack trace colors
//  - Keep `error.name` output consistent regardless of `props` and `stack`
//    since `util.inspect()` sometimes print it differently
export const omitProps = (error, props) => {
  if (props) {
    return error
  }

  // eslint-disable-next-line unicorn/error-message
  const errorCopy = new Error('')
  Object.setPrototypeOf(errorCopy, Object.getPrototypeOf(error))
  copyDescriptors(errorCopy, error)
  return errorCopy
}

const copyDescriptors = (errorCopy, error) => {
  COPIED_PROPS.forEach((propName) => {
    copyDescriptor(errorCopy, error, propName)
  })
}

const COPIED_PROPS = ['name', 'message', 'stack']

const copyDescriptor = (errorCopy, error, propName) => {
  const descriptor = Object.getOwnPropertyDescriptor(error, propName)

  if (descriptor !== undefined) {
    Object.defineProperty(errorCopy, propName, descriptor)
  }
}
