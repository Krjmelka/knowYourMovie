const io = require('socket.io')
const { getMovieTask, userScoreUpdate, getMoviesArr } = require('./graphql/Resolvers')
const gameServer ={
    listen(server){
        game = io(server)
        let gamers = []
        let deleteGamer = (gamer) => {
            let copy = {...gamer}
            delete copy.socket
            return copy
        }
        let thisGamer = sock  => gamers.filter(g => g.socket === sock) [0]
        let gamerById = id => gamers.filter(g => g.id === id)[0]
        let emitGamers = () => game.emit('gamers', gamers.map(deleteGamer))
        game.on('connection', (socket) => {
            console.log('user connected!', socket.id);
            socket.on('disconnect', () => {
                console.log("user disconnected", socket.id);
                gamers = gamers.filter(n => n.socket !== socket)
                emitGamers()
            })
            socket.on('updateScore', async (userId, fn) => fn(await userScoreUpdate(userId)))
            socket.on('getGame', async (fn) => fn(await getMovieTask()))
            socket.on('multiConnect', data => {
                gamers.push({
                    nick: data.username, 
                    userId: data.userId, 
                    socket: socket, 
                    id: socket.id, 
                    ready: false,
                    answered: false,
                    sessionScore: 0

                })
                // console.log(gamers);
                emitGamers()
            })
            socket.on('invite', async (id, fn) => {
                let gamer = thisGamer(socket)
                let opponent = gamerById(id)
                let counter = 0
                
                gamer.socket.on('readyForGame', () => {
                    gamer.ready = true
                    emitGamers()
                })
                opponent.socket.emit('gotInvite', {username: gamer.nick, score: gamer.sessionScore})
                
                
                opponent.socket.on('readyForGame', () => {
                    opponent.ready = true
                    gamer.socket.emit('gotInvite', {username: opponent.nick, score: opponent.sessionScore})
                    emitGamers()
                })
                let tasks = await getMoviesArr();


                if(opponent.ready && gamer.ready){
                    let data = {...tasks[counter], gameNumber: counter+1}
                    gamer.socket.emit('getGameTask', {data})
                    opponent.socket.emit('getGameTask', {data})
                }

                gamer.socket.on('nextMovie', (data)=> {
                    gameInit(gamer, opponent, data)
                })
                opponent.socket.on('nextMovie', (data)=> {
                    gameInit(opponent, gamer, data)                   
                })

                let gameInit = (gamer, opponent, data) => {
                    gamer.answered = true
                    gamer.sessionScore =+ data
                    console.log(gamer.nick, gamer.sessionScore);
                    if(opponent.answered && gamer.answered) {
                        counter++
                        if(counter < 10){
                            console.log(counter);
                            console.log(gamer.sessionScore, opponent.sessionScore);
                            let data = {...tasks[counter], gameNumber: counter+1}
                            gamer.socket.emit('getGameTask', {data, score: opponent.sessionScore})
                            opponent.socket.emit('getGameTask', {data, score: gamer.sessionScore})
                            gamer.answered = false
                            opponent.answered = false
                            
                        }
                        else {
                            console.log("here", counter);
                        }
                        // let data = {...tasks[counter], gameNumber: counter+1}
                        // gamer.socket.emit('getGameTask', {data, score: opponent.sessionScore})
                        // opponent.socket.emit('getGameTask', {data, score: gamer.sessionScore})
                        // gamer.answered = false
                        // opponent.answered = false
                    }
                }
                

            })

            
        })
        
    }
    
}
module.exports = gameServer