const io = require('socket.io')
const { getMovieTask, userScoreUpdate } = require('./graphql/Resolvers')
const gameServer ={
    listen(server){
        game = io(server)
        game.on('connection', (socket) => {
            console.log('user connected!', socket.id);
            socket.on('disconnect', () => {
                console.log("user disconnected", socket.id);
            })
            socket.on('updateScore', async (userId, fn) => fn(await userScoreUpdate(userId)))
            socket.on('getGame', async (fn) => fn(await getMovieTask()))
        })
        
    }
    
}
module.exports = gameServer