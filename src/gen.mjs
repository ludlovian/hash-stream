import { createHash } from 'crypto'

export default function hashStream ({ algo = 'md5', enc = 'hex' } = {}) {
  return async function * transform (source) {
    const hasher = createHash(algo)
    for await (const chunk of source) {
      hasher.update(chunk)
      yield chunk
    }
    transform.hash = hasher.digest(enc)
  }
}
