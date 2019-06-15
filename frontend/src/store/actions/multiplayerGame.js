const waitForOpponent = () => ({type: 'WAITING_FOR_OPPONENT'})

const gotOpponent = (payload) => ({type: 'GOT_OPPONENT', payload})

const getData = () => ({type: 'GET_DATA'})

const playerReady = () => ({type: 'PLAYER_READY'})

const updOpponentsScore = (payload) => ({type: 'OPPONENST_SCORE_UPDATE', payload})

const winner = (payload) => ({type: 'GOT_A_WINNER', payload})

const getDataSuccess = (payload) => ({type: 'DATA_SUCCESS',payload})

const resetGame = () => ({type: 'PLAY_AGAIN'})

const sessionScoreUpdate = (payload) => ({type: 'UPDATE_SCORE', payload})

const scoreUpdate = (payload) => ({type: 'SCORE_UPDATED', payload})

const endGame = () => ({type: 'EXIT_GAME'})

const playersList = (payload) => ({type: 'GET_PLAYERS_LIST', payload})

export const getPlayersList = (data) => {
    return (dispatch) => {
        dispatch(playersList(data))
    }
}
export const invitePlayer = (socket, opponent) => {
    return (dispatch) => {
        dispatch(waitForOpponent())
        socket.emit('invite', opponent, (data) => {
        })
        socket.emit('readyForGame')
        dispatch(playerReady())

    }
}
export const gotInvite = (data) => {
    return (dispatch) => {
        dispatch(gotOpponent(data))
    }
}
export const readyForGame =() => {
    return (dispatch) => {
        dispatch(playerReady())

    }
}
export const nextMovie = (socket, data)=> {
    return (dispatch) => {
        dispatch(waitForOpponent())
        socket.emit('nextMovie', (data))
    }
}
export const updateScore = (data) => {
    return (dispatch) => {
        dispatch(sessionScoreUpdate(data))
    }
}
export const exitGame =() => {
    return (dispatch) => {
        dispatch(endGame())
    }
}
export const gameData =({data, score}) => {
    return (dispatch) => {
        if(score) dispatch(updOpponentsScore(score))
        dispatch(getData())
        dispatch(getDataSuccess(data))
    }
}
export const gotaWinner = (data) => {
    return(dispatch) => {
        dispatch(winner(data))
    }
}
export const globalScoreUpdate = (data) => {
    return (dispatch) => {
        dispatch(scoreUpdate(data))
    }
}
export const startAgain = () => {
    return (dispatch) => {
        dispatch(resetGame())
    }
}

