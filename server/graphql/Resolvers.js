const Movie = require('../database/models/Movie')
const User = require('../database/models/User')
const randomizer = require('../helpers/randomizer')
const getImage = require('../helpers/getImage')
const jwt = require('jsonwebtoken')
const encryptPassword = require('../helpers/encryptPassword')

async function getMovieTask(){
    let movies = []
//   while (movies.length < 4){
//       let rand = randomizer(473,false)
//       let mv = await Movie.findByPk(rand)
//   }
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
async function createUser({user, password, email}){
  let findUser = await User.findOne({where: {user}})
  let findEmail = await User.findOne({where: {email}})
  
  if (findUser){
      return { 
          error: "Name is exist" 
      }
  }
  else if(findEmail){
    return {
        error: "Email is exist" 
    }
  }
  else {
      try{
          await User.create({
              user, 
              password,
              email
          })
          return {
              user
          }
      }
      catch (err){
          throw new Error(err);
          
      }
  }
}
async function userAuth({user, password}){
    let finduser = await User.findOne({where: {user}})
    if (!finduser || encryptPassword(password) !== finduser.password){
        return {
            error: "Auth failed"
        }
    } else {
        const token = jwt.sign({
            username: finduser.user,
            userId: finduser.id
        },"superTopSecret")
        return {
            userId: finduser.id,
            token
        }
    }
}

module.exports = {
    getMovieTask,
    createUser,
    userAuth
}