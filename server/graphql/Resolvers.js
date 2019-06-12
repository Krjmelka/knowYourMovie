const Movie = require('../database/models/Movie')
const Sequalize = require('sequelize')
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
async function getMoviesArr(){
    let movies = []
    for (var i=0; i < 10; i++){
        movies.push(await getMovieTask())  
    }
    return movies
}
async function createUser({user, password, email}){
  let findUser = await User.findOne({where: {user}})
  let findEmail = await User.findOne({where: {email}})
  
  if (findUser){
      return { 
          error: "This Username is already in use" 
      }
  }
  else if(findEmail){
    return {
        error: "This email is already in use" 
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
            error: "Incorrect Username or Password"
        }
    } else {
        const token = jwt.sign({
            username: finduser.user,
            userId: finduser.id
        },"superTopSecret")
        return {
            userId: finduser.id,
            score: finduser.score,
            token
        }
    }
}
async function userScoreUpdate(userId) {
    // let finduser = await User.findByPk(id)
    // await finduser.increment('score', {by: 10})
    await User.update({score: Sequalize.literal('score + 10')}, {where: {id: userId}})
    let userscore =  await User.findByPk(userId)
    return userscore.score
}
async function getUserData(userId) {
    let res =  await User.findByPk(userId.id)
    return {
        score: res.score,
        userId: res.id
    }
}
module.exports = {
    getMovieTask,
    createUser,
    userAuth,
    userScoreUpdate,
    getUserData,
    getMoviesArr
}