import { createReadStream } from 'fs'
import { finished } from 'stream/promises'
import test from 'ava'

import hashStream from '../src/index.mjs'

const file = 'test/test.mjs'

test('hash a stream', async t => {
  const hasher = hashStream()
  const dataStream = createReadStream(file)
  dataStream.pipe(hasher)
  hasher.resume()
  await finished(hasher)
  t.snapshot(hasher.hash)
})

test('errors are forwarded', async t => {
  const hasher = hashStream()
  const dataStream = createReadStream(file)
  const err = new Error('Oops')

  dataStream.pipe(hasher)
  setImmediate(() => dataStream.emit('error', err))
  await t.throwsAsync(finished(hasher), {
    is: err
  })
})
