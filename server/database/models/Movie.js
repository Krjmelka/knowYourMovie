const Sequalize = require('sequelize')
const db = require('../database')

const Movie = db.define('Movie', {
    mdb_id: {
        type: Sequalize.INTEGER(11),
        unique: true       
    },
    movie_title: {
        type: Sequalize.STRING(60)
    }
},{
    timestamps: true,
    updatedAt: false
})
// db.sync()


module.exports = Movie