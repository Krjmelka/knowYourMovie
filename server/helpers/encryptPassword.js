var shajs = require('sha.js')
console.log('here')
module.exports = pw => shajs('sha256').update(pw).update("supersecretkey").digest('hex')
