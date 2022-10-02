<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/handle-cli-error/handle-cli-error_dark.svg"/>
  <img alt="handle-cli-error logo" src="https://raw.githubusercontent.com/ehmicky/design/main/handle-cli-error/handle-cli-error.svg" width="500"/>
</picture>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/handle-cli-error.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/handle-cli-error)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/src/main.d.ts)
[![Node](https://img.shields.io/node/v/handle-cli-error.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/handle-cli-error)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Error handler for CLI applications.

# Features

- 💣 [Error class-specific](#-classes) handling
- 🚒 [Graceful exit](#-timeout)
- ⛑️ [Normalize](https://github.com/ehmicky/normalize-exception) invalid errors
- 📕 Log verbosity: full, [short](#-short) or [silent](#-silent)
- 🚨 Custom [exit code](#-exitcode)
- 💥 Exception-safe

# Example

## General

```js
#!/usr/bin/env node
import handleCliError from 'handle-cli-error'

const cliMain = function () {
  try {
    // ...
  } catch (error) {
    handleCliError(error) // Print `error` then exit the process
  }
}

cliMain()
```

## Error class-specific

```js
handleCliError(error, {
  classes: {
    InputError: { exitCode: 1, short: true },
    DatabaseError: { exitCode: 2, short: true },
    default: { exitCode: 3 },
  },
})
```

# Install

```bash
npm install handle-cli-error
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## handleCliError(error, options?)

`error` `any`\
`options` [`Options?`](#options)\
_Return value_: `undefined`

Prints `error` on the console (`stderr`) then exits the process.

This never throws. Invalid `error`s are silently
[normalized](https://github.com/ehmicky/normalize-exception).

### Options

#### 🚨 exitCode

_Type_: `integer`\
_Default_: `1`

Process [exit code](https://en.wikipedia.org/wiki/Exit_status).

Note: when passing invalid [`options`](#options), the exit code is always `125`.

#### 📕 short

_Type_: `boolean`\
_Default_: `false`

When `true`, only the `error` message is logged, not its stack trace.

This is useful when the error was caused by the user (as opposed to being an
internal bug), in which cause the stack trace is not relevant to the user.

#### 🔕 silent

_Type_: `boolean`\
_Default_: `false`

When `true`, the process exits without logging anything on the console.

#### 🚒 timeout

_Type_: `integer` (in milliseconds)\
_Default_: `5000` (5 seconds)

The process exits gracefully: it waits for any ongoing tasks (callbacks,
promises, etc.) to complete, up to a specific `timeout`.

Special values:

- `0`: Exits right away, without waiting for ongoing tasks
- `Number.POSITIVE_INFINITY`: Waits for ongoing tasks forever, without timing
  out

#### 💣 classes

_Type_: `object`\
_Default_: `{}`

Specify [different options per error class](#error-class-specific). The object:

- Keys are either the
  [`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name),
  or `"default"` (used if no `error.name` matches)
- Values are [options](#options) objects

# Related projects

- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors
  like it's 2022 🔮
- [`error-custom-class`](https://github.com/ehmicky/error-custom-class): Create
  one error class
- [`error-class-utils`](https://github.com/ehmicky/error-class-utils): Utilities
  to properly create error classes
- [`error-serializer`](https://github.com/ehmicky/error-serializer): Convert
  errors to/from plain objects
- [`normalize-exception`](https://github.com/ehmicky/normalize-exception):
  Normalize exceptions/errors
- [`merge-error-cause`](https://github.com/ehmicky/merge-error-cause): Merge an
  error with its `cause`
- [`set-error-class`](https://github.com/ehmicky/set-error-class): Properly
  update an error's class
- [`set-error-message`](https://github.com/ehmicky/set-error-message): Properly
  update an error's message
- [`set-error-props`](https://github.com/ehmicky/set-error-props): Properly
  update an error's properties
- [`error-cause-polyfill`](https://github.com/ehmicky/error-cause-polyfill):
  Polyfill `error.cause`
- [`log-process-errors`](https://github.com/ehmicky/log-process-errors): Show
  some ❤ to Node.js process errors

# Credits

The logo background was created by
[dgim-studio](https://www.freepik.com/free-vector/comic-dynamic-elements-set_7997347.htm).

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/handle-cli-error/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/handle-cli-error/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
