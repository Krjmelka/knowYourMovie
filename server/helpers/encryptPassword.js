var shajs = require('sha')
module.exports = pw => shajs('sha256').update(pw).update("supersecretkey").digest('hex')
