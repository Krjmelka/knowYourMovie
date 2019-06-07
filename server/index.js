const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const express_graphql = require('express-graphql')
const isAuth = require('./middleware/isAuth')
const gameServer = require('./gameServer')

gameServer.listen(http)

app.use(cors())
app.use(bodyParser.json())

//-----------------Database--------------------------
const db = require('./database/database')

// const Movie = require('./database/models/Movie')
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
// console.log(root);
app.use(isAuth)
app.use('/graphql', express_graphql({
  schema,
  rootValue : root,
  graphiql: true
}))

// io.on('connection', (socket) => {
//   console.log('a user connected', socket.id);
//   socket.on("disconnect", () => {
//     console.log("a user disconnected");
//   })
// });

const PORT = process.env.PORT || 8000
http.listen(PORT, () => console.log(`Listening on port ${PORT}`))