const waitForOpponent = () => ({type: 'WAITING_FOR_OPPONENT'})

const gotOpponent = (payload) => ({type: 'GOT_OPPONENT', payload})

const playerReady = () => ({type: 'PLAYER_READY'})

const updOpponentsScore = (payload) => ({type: 'OPPONENST_SCORE_UPDATE', payload})

const getDataSuccess = (payload) => ({type: 'DATA_SUCCESS',payload})

const scoreUpdate = (payload) => ({type: 'UPDATE_SCORE', payload})

const endGame = () => ({type: 'EXIT_GAME'})

const playersList = (payload) => ({type: 'GET_PLAYERS_LIST', payload})

export const getPlayersList = (data) => {
    return (dispatch) => {
        // console.log(data);
        dispatch(playersList(data))
    }
}
export const invitePlayer = (socket, opponent) => {
    return (dispatch) => {
        dispatch(waitForOpponent())
        socket.emit('invite', opponent, (data) => {
            console.log(data);
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
        console.log(data);
        socket.emit('nextMovie', (data))
    }
}
export const updateScore = (data) => {
    return (dispatch) => {
        dispatch(scoreUpdate(data))
    }
}
export const exitGame =() => {
    return (dispatch) => {
        dispatch(endGame())
    }
}
export const gameData =({data, score}) => {
    return (dispatch) => {
        console.log(score);
        if(score) dispatch(updOpponentsScore(score))
        dispatch(getDataSuccess(data))
    }
}

