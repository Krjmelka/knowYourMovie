const gameData = () => ({
        type: 'GET_DATA'
})
const gameDataSuccsess = (payload) => ({
        type: 'GET_DATA_SUCCESS',
        payload
})
const scoreUpdated = (payload) => ({
        type: 'SCORE_UPDATED',
        payload
})
export const updateScore = (userId, socket) => {
    return (dispatch) => {
        socket.emit('updateScore', userId, (data) => dispatch(scoreUpdated(data)))
    }
}

export const getMovieData = (socket) => {
    return (dispatch) => {
        dispatch(gameData())
        socket.emit('getGame', (data) => dispatch(gameDataSuccsess(data)))
    }
}