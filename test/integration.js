import { fileURLToPath } from 'url'

import test from 'ava'
import { execa } from 'execa'
import { each } from 'test-each'

const FIXTURE_PATH = fileURLToPath(
  new URL('helpers/fixtures/integration.js', import.meta.url),
)

each(
  [
    // When logic has a long task, it is terminated after "timeout" option is
    // done
    { handlerTimeout: 1, logicTimeout: 1e8 },
    // When the "timeout" option is longer than logic pending tasks, it does
    // not hold the process
    { handlerTimeout: 1e8, logicTimeout: 1 },
  ],
  ({ title }, { handlerTimeout, logicTimeout }) => {
    test.serial(`Process is not held | ${title}`, async (t) => {
      const { exitCode, stderr, timedOut } = await execa(
        'node',
        [FIXTURE_PATH, String(handlerTimeout), String(logicTimeout)],
        { reject: false, timeout: 1e4 },
      )
      t.is(exitCode, 1)
      t.true(stderr.includes('test'))
      t.false(timedOut)
    })
  },
)
