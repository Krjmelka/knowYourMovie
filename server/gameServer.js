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
            socket.on('updateScore', async (userId, fn) => fn(await userScoreUpdate(userId, 10)))
            socket.on('getGame', async (fn) => fn(await getMovieTask()))
            socket.on('multiConnect', data => {
                gamers.push({
                    nick: data.username, 
                    userId: data.userId, 
                    socket: socket, 
                    id: socket.id, 
                    ready: false,
                    answered: false,
                    waiting: false,
                    sessionScore: 0

                })
                emitGamers()
            })
            socket.on('invite', async (id) => {
                let gamer = thisGamer(socket)
                let opponent = gamerById(id)
                let counter = 0
                let tasks = null
                
                gamer.socket.on('readyForGame', () => {
                    gamer.ready = true
                    gamer.waiting = true
                    opponent.waiting = true
                    emitGamers()
                })
                
                opponent.socket.emit('gotInvite', {username: gamer.nick, score: gamer.sessionScore})
                
                opponent.socket.on('cancelGame', () => {
                    gamer.ready = false
                    opponent.ready = false
                    gamer.waiting = false
                    opponent.waiting = false
                    gamer.socket.emit('opponentCanceled')
                    emitGamers()
                })
                gamer.socket.on('cancelGame', () => {
                    gamer.ready = false
                    opponent.ready = false
                    gamer.waiting = false
                    opponent.waiting = false
                    opponent.socket.emit('opponentCanceled')
                    emitGamers()
                })
                
                opponent.socket.on('readyForGame', () => {
                    opponent.ready = true
                    gamer.socket.emit('gotInvite', {username: opponent.nick, score: opponent.sessionScore})
                    emitGamers();
                    (async () => {
                        tasks = await getMoviesArr();
                        let data = {...tasks[counter], gameNumber: counter+1}
                        gamer.socket.emit('getGameTask', {data})
                        opponent.socket.emit('getGameTask', {data})
                    })()
                })

                gamer.socket.on('nextMovie', (data)=> {
                    gameInit(gamer, opponent, data)
                })
                opponent.socket.on('nextMovie', (data)=> {
                    gameInit(opponent, gamer, data)                   
                })

                let gameInit = async (gamer, opponent, data) => {
                    gamer.answered = true
                    gamer.sessionScore =+ data
                    if(opponent.answered && gamer.answered) {
                        counter++
                        if(counter < 10){
                            let data = {...tasks[counter], gameNumber: counter+1}
                            gamer.socket.emit('getGameTask', {data, score: opponent.sessionScore})
                            opponent.socket.emit('getGameTask', {data, score: gamer.sessionScore})
                            gamer.answered = false
                            opponent.answered = false
                        }
                        else {
                            if (gamer.sessionScore > opponent.sessionScore){
                                counter = 0
                                gamer.socket.emit('gotaWinner', {username: gamer.nick, draw: false})
                                opponent.socket.emit('gotaWinner', {username: gamer.nick, draw: false})
                                gamer.socket.emit('updateUserScore', await userScoreUpdate(gamer.userId, 200))
                                emitGamers()
                            }
                            else if(opponent.sessionScore > gamer.sessionScore){
                                counter = 0
                                gamer.socket.emit('gotaWinner', {username: opponent.nick, draw: false})
                                opponent.socket.emit('gotaWinner', {username: opponent.nick, draw: false})
                                opponent.socket.emit('updateUserScore', await userScoreUpdate(opponent.userId, 200))
                                emitGamers()
                            }
                            else {
                                counter = 0
                                gamer.socket.emit('gotaWinner', {draw: true})
                                opponent.socket.emit('gotaWinner', {draw: true})
                                gamer.socket.emit('updateUserScore', await userScoreUpdate(gamer.userId, 100))
                                opponent.socket.emit('updateUserScore', await userScoreUpdate(opponent.userId, 100))
                                emitGamers()
                            }
                            
                        }

                    }
                }
                

            })

            
        })
        
    }
    
}
module.exports = gameServer