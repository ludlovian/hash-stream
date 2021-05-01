import { test } from 'uvu'
import * as assert from 'uvu/assert'

import hashFile from '../src/simple.mjs'

const file = 'src/index.mjs'
const HASH = '995c5d92c6718deccf887bf57cd86c23'

test('hash the file', async () => {
  const hash = await hashFile(file)
  assert.is(hash, HASH)
})

test.run()
