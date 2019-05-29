var shajs = require('sha.js')
module.exports = pw => shajs('sha256').update(pw).update("supersecretkey").digest('hex')
