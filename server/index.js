const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

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

const randomizer = require('./helpers/randomizer')
const getImage = require('./helpers/getImage')
const randMovie = async () => {
  let movie = []
  for (i=0; i < 4; i++){
    let mv = await Movie.findByPk(randomizer(300,false))
    movie.push({
      title: mv.movie_title,
      mdb_id: mv.mdb_id,
      answer: false
    })
  }
  let rand = randomizer(4)
  movie[rand].answer = true
  movie.push({imageURL: await getImage(movie[rand].mdb_id)})
  console.log(movie)
}
randMovie()

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Listening on port ${PORT}`))