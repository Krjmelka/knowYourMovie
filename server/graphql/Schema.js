const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Query {
        getMovieTask: MovieTask
    }
    type MovieTask {
        movies: [Movie]
        imageURL: String!
    }
    type Movie {
        title: String!
        mdb_id: Int!
        answer: Boolean!
    }
`)