'use strict'

import { Transform } from 'stream'
import { createHash } from 'crypto'

export default function hashStream (algo = 'md5', enc = 'hex') {
  const hasher = createHash(algo)
  const hs = new Transform({
    transform (chunk, enc, cb) {
      hasher.update(chunk)
      cb(null, chunk)
    },
    flush (cb) {
      hs.hash = hasher.digest(enc)
    }
  })
  // forward errors
  hs.on('pipe', src => src.on('error', err => hs.emit('error', err)))

  return hs
}
