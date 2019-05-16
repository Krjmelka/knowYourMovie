const Movie = require('../database/models/Movie')
const randomizer = require('../helpers/randomizer')
const getImage = require('../helpers/getImage')

async function getMovieTask(){
    let movies = []
  
  for (i=0; i < 4; i++){
    let mv = await Movie.findByPk(randomizer(473,false))
    movies.push({
      title: mv.movie_title,
      mdb_id: mv.mdb_id,
      answer: false
    })
  }

  let rand = randomizer(4)
  movies[rand].answer = true
  const imageURL = await getImage(movies[rand].mdb_id)
  return {
      movies,
      imageURL
  }
}

module.exports = {
    getMovieTask
}