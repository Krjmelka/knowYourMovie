const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Query {
        getMovieTask: MovieTask
        userAuth(user: String!, password: String!): AuthData!
        getUserData(id: Int!): User
    }
    type Mutation {
        createUser(user: String!, password: String!, email: String!): User
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
    type User {
        user: String
        password: String
        email: String
        score: Int
        error: String
    }
    type AuthData {
        token: String
        score: Int
        error: String
    }
    
`)