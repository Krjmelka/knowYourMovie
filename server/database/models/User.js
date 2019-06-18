const Sequalize = require('sequelize')
const db = require('../database')
const encryptPassword = require('../../helpers/encryptPassword')

const User = db.define('User', {
    user: {
        type: Sequalize.STRING(32),
        unique: true
    },
    password: {
        type: Sequalize.STRING,
        set(pw) {this.setDataValue("password",encryptPassword(pw))}
    },
    email: {
        type: Sequalize.STRING(32),
        unique: true
    },
    score: {
        type: Sequalize.INTEGER(11),
        defaultValue: 0
    }
})
// db.sync()


module.exports = User