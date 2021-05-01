# hash-stream
Transfer stream that hashes

**NOTE** You should now be using the async gen version at **/gen**

## Stream API

Only one (default) export

### hashStream
`hs = hashStream({algo, enc})`

Returns a transfer stream that hashes as it passes data through

### .hash
Set to the encoded digest once the stream has ended

## Simple API

A single function that hashes a file.

```
import hashFile from 'hash-stream/simple'

const hash = hashFile('abc.txt', {algo enc} = {})
```
