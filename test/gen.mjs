import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { pipeline } from 'stream/promises'
import { createReadStream } from 'fs'

import hashStream from '../src/gen.mjs'

const file = 'src/index.mjs'
const HASH = '995c5d92c6718deccf887bf57cd86c23'

test('hash the stream', async () => {
  const hasher = hashStream()
  await pipeline(createReadStream(file), hasher, sink)
  assert.is(hasher.hash, HASH)
})

async function * sink (source) {
  let size = 0
  for await (const chunk of source) {
    size += chunk.length
  }
  return size
}

test.run()
