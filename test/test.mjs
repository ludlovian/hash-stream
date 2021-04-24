import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { createReadStream } from 'fs'
import { finished } from 'stream/promises'

import hashStream from '../src/index.mjs'

const file = 'src/index.mjs'

test('hash a stream', async () => {
  const hasher = hashStream()
  const dataStream = createReadStream(file)
  dataStream.pipe(hasher)
  hasher.resume()
  await finished(hasher)

  assert.is(hasher.hash, '995c5d92c6718deccf887bf57cd86c23')
})

test('errors are forwarded', async () => {
  const hasher = hashStream()
  const dataStream = createReadStream(file)
  const err = new Error('Oops')

  dataStream.pipe(hasher)
  Promise.resolve().then(() => dataStream.emit('error', err))

  await finished(hasher).then(
    () => assert.unreachable(),
    e => {
      assert.is(e, err)
    }
  )
})

test.run()
