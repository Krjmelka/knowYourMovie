const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const express_graphql = require('express-graphql')

const app = express()
app.use(cors())
app.use(bodyParser.json())

//-----------------Database--------------------------
const db = require('./database/database')

const Movie = require('./database/models/Movie')
// const getMovies = require('./helpers/imdbId')

db.authenticate()
.then(() => {
  console.log('Database connected');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
db.sync()

//-----------------GraphQL--------------------------
const schema = require('./graphql/Schema')
const root = require('./graphql/Resolvers')
app.use('/graphql', express_graphql({
  schema,
  rootValue : root,
  graphiql: true
}))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Listening on port ${PORT}`))