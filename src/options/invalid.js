// Handle invalid `options`
export const handleInvalidOpts = function (message, value, optName) {
  const fullOptName =
    optName.length === 0 ? 'options' : `"${optName.join('.')}"`
  throw new Error(`${fullOptName} ${message}: ${value}`)
}
