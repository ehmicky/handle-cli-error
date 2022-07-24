<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/handle-cli-error/handle-cli-error_dark_6.svg"/>
  <img alt="spyd logo" src="https://raw.githubusercontent.com/ehmicky/design/main/handle-cli-error/handle-cli-error.svg" width="500"/>
</picture>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/handle-cli-error.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/handle-cli-error)
[![Node](https://img.shields.io/node/v/handle-cli-error.svg?logo=node.js)](https://www.npmjs.com/package/handle-cli-error)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray)](/src/main.d.ts)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

💥 Error handler for CLI applications.

# Features

- [Error type-specific](#types) handling
- [Graceful exit](#timeout)
- [Normalize](https://github.com/ehmicky/normalize-exception) invalid errors
- Log verbosity: full, [short](#short) or [silent](#silent)
- Custom [exit code](#exitcode)
- Exception-safe

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

## Error type-specific

```js
handleCliError(error, {
  InputError: { exitCode: 1, short: true },
  DatabaseError: { exitCode: 2, short: true },
  InternalError: { exitCode: 3 },
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

#### exitCode

_Type_: `integer`\
_Default_: `1`

Process [exit code](https://en.wikipedia.org/wiki/Exit_status).

Note: when passing invalid [`options`](#options), the exit code is always `125`.

#### short

_Type_: `boolean`\
_Default_: `false`

When `true`, only the `error` message is logged, not its stack trace.

This is useful when the error was caused by the user (as opposed to being an
internal bug), in which cause the stack trace is not relevant to the user.

#### silent

_Type_: `boolean`\
_Default_: `false`

When `true`, the `error` is not logged. The process still exits with a specific
[exit code](#exitcode).

#### timeout

_Type_: `integer` (in milliseconds)\
_Default_: `5000` (5 seconds)

The process exits gracefully: it waits for any ongoing tasks (callbacks,
promises, etc.) to complete, up to a specific `timeout`.

Special values:

- `0`: Exits right away, without waiting for ongoing tasks
- `Number.POSITIVE_INFINITY`: Waits for ongoing tasks forever, without timing
  out

#### types

_Type_: `object`\
_Default_: `{}`

Specify [different options per error type](#error-type-specific). The object:

- Keys are either the
  [`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name),
  or `"default"` (used if no `error.name` matches)
- Values are [options](#options) objects

# Related projects

- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors
  like it's 2022 🔮
- [`error-type`](https://github.com/ehmicky/error-type): Create custom error
  types
- [`normalize-exception`](https://github.com/ehmicky/normalize-exception):
  Normalize exceptions/errors
- [`merge-error-cause`](https://github.com/ehmicky/merge-error-cause): Merge an
  error with its `cause`
- [`error-cause-polyfill`](https://github.com/ehmicky/error-cause-polyfill):
  Polyfill `error.cause`

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
