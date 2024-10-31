import { inspect } from 'node:util'

import { getColors } from './colors.js'
import { prettifyError } from './pretty.js'
import { omitProps } from './props.js'
import {
  omitStack,
  omitStackBracket,
  PRINT_MAX_DEPTH,
  restoreStack,
} from './stack.js'

// Print the error.
// If `stack: false`, we do not print the error `stack` nor inline preview,
// which is useful for well-known errors such as input validation.
// Otherwise, we pass the `error` instance to `console.error()`, so it prints
// not only its `message` and `stack` but also its properties, `cause`,
// aggregate `errors`, add colors, inline preview, etc. using `util.inspect()`.
export const printError = ({
  error,
  silent,
  stack,
  props,
  colors,
  icon,
  header,
}) => {
  if (silent) {
    return
  }

  const { addStyles, useColors } = getColors(colors)
  const errorString = serializeError({ error, stack, props, useColors })
  const errorStringA = prettifyError({
    error,
    errorString,
    addStyles,
    useColors,
    icon,
    header,
  })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.error(errorStringA)
}

const serializeError = ({ error, stack, props, useColors }) => {
  const errorA = omitProps(error, props)
  omitStack(errorA, stack)
  const errorString = inspect(errorA, {
    colors: useColors,
    depth: PRINT_MAX_DEPTH,
  })
  restoreStack(errorA, stack)
  const errorStringA = omitStackBracket(errorString)
  return errorStringA
}
