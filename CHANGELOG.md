# 3.0.0

## Breaking changes

- Rename the `short` option to [`stack`](README.md#-stack). Its value is
  inverted.

Before:

```js
handleCliError(error, { short: true })
```

After:

```js
handleCliError(error, { stack: false })
```

# 2.5.1

## Bug fixes

- Fix `package.json`

# 2.5.0

- Switch to MIT license

# 2.4.2

## Bug fixes

- Revert browsers support

# 2.4.1

## Bug fixes

- Fix error validation message

# 2.4.0

## Features

- Improve options validation

# 2.3.0

## Features

- Improve options validation

# 2.2.0

## Features

- Ensure error properties and colors are printed

# 2.1.0

## Features

- Browsers support

# 2.0.0

## Breaking changes

- Rename `types` option to [`classes`](README.md#-classes)

# 1.1.1

## Bug fixes

- Print error `name` and `message` on Firefox and Safari

# 1.1.0

## Features

- Reduce npm package size

# 1.0.1

Initial release
