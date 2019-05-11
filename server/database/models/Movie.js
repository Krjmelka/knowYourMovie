const Sequalize = require('sequelize')
const db = require('../database')

const Movie = db.define('Movie', {
    mdb_id: {
        type: Sequalize.INTEGER(11)        
    },
    movie_title: {
        type: Sequalize.STRING(50)
    }
})
db.sync()


module.exports = Movie