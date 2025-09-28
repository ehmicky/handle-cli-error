# 6.0.0

## Breaking changes

- Previously, if the [`props`](README.md#-props) option was `false`, nested
  errors
  ([`error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
  and
  [`error.errors`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError/errors))
  were not printed. To achieve the same behavior, the
  [`cause`](README.md#-cause) option must now be set to `false`.

## Features

- Nested errors are now printed on their own, which result in a prettier output.

# 5.3.0

## Features

- Add option [`log`](README.md#-log) to customize printing the error message.

# 5.2.1

## Bug fixes

- Fix issues printing errors that include `]` in their message, when the
  [`stack`](README.md#-stack) option is `false`.

# 5.2.0

## Features

- Allow [exit codes](README.md#-exitcode) from 125 to 255.

# 5.1.0

## Features

- Split the core logic into a separate package:
  [`beautiful-error`](https://github.com/ehmicky/beautiful-error). It can be
  used if you want to prettify an error but not exit the process.

# 5.0.1

## Documentation

- Improve documentation in `README.md`

# 5.0.0

## Breaking changes

- Minimal supported Node.js version is now `18.18.0`

# 4.0.2

## Dependencies

- Upgrade internal dependencies

# 4.0.1

## Dependencies

- Upgrade internal dependencies

# 4.0.0

## Breaking changes

- Minimal supported Node.js version is now `16.17.0`

# 3.1.1

## Bug fixes

- Fix TypeScript types

# 3.1.0

## Features

- Improve tree-shaking support

# 3.0.1

## Bug fixes

- Fix handling of errors that do not have any stack trace

# 3.0.0

## Breaking changes

- Renamed the `short` option to [`stack`](README.md#-stack). Its value is
  inverted.

Before:

```js
handleCliError(error, { short: true })
```

After:

```js
handleCliError(error, { stack: false })
```

- The error's name is now always logged even if [`stack`](README.md#-stack) is
  `false`.

## Features

- The [`colors` option](README.md#%EF%B8%8F-colors) has been added to show
  colors. It defaults to `true` in terminals.
- Quoted strings in the error message are now
  [colorized](README.md#%EF%B8%8F-colors).
- An icon is now prepended to the error's name. This can be configured using the
  [`icon` option](README.md#-icon).
- The error's icon and name are now logged in red by default. This can be
  configured using the [`header` option](README.md#-header).
- The [`props` option](README.md#-props) has been added to hide error
  properties.

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
