'use strict';

var stream = require('stream');
var crypto = require('crypto');

function hashStream (algo = 'md5', enc = 'hex') {
  const hasher = crypto.createHash(algo);
  const hs = new stream.Transform({
    transform (chunk, enc, cb) {
      hasher.update(chunk);
      cb(null, chunk);
    },
    flush (cb) {
      hs.hash = hasher.digest(enc);
      cb();
    }
  });
  hs.on('pipe', src => src.on('error', err => hs.emit('error', err)));
  return hs
}

module.exports = hashStream;
