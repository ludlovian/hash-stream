import { createReadStream } from 'fs'
import { createHash } from 'crypto'

export default async function hashFile (
  filename,
  { algo = 'md5', enc = 'hex' } = {}
) {
  const hasher = createHash(algo)
  for await (const chunk of createReadStream(filename)) {
    hasher.update(chunk)
  }
  return hasher.digest(enc)
}
