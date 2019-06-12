const initialState ={
    waitingForOpponent : false,
    dataIsLoading: false,
    gameDataLoaded : false,
    gotInvite: false,
    inviteAccepted: false,
    gameReady : false,
    gameScore: 0,
    gamers : null,
    opponent : null,
    winner : null,
    data : null    
}
export function multiplayerGameStatus(state = initialState, action) {
    switch (action.type) {
        case 'GET_PLAYERS_LIST':
            return{
                ...state,
                gamers: action.payload
            }
        case 'WAITING_FOR_OPPONENT':
            return {
                ...state,
                waitingForOpponent: true,
            }
        case 'GOT_OPPONENT':
            return {
                ...state,
                waitingForOpponent: false,
                gotInvite: false,
                opponent: action.payload
            }
        case 'OPPONENST_SCORE_UPDATE':
            return {
                ...state,
                opponent: {
                    ...state.opponent,
                    score: action.payload
                }
            }
        case 'PLAYER_READY':
            return {
                ...state,
                playerReady: true
            }
        case 'GOT_INVITE':
            return {
                ...state,
                gotInvite: true
            }
        case 'GET_DATA':
            return {
                ...state,
                dataIsLoading: true,
                gameDataLoaded: false
            };
        case 'UPDATE_SCORE':
            return{
                ...state,
                gameScore: action.payload
            }
        case 'DATA_SUCCESS':
            return {
                ...state,
                waitingForOpponent: false,
                dataIsLoading: false,
                gameDataLoaded: true,
                gameReady: true,
                data: action.payload
            }
        case 'EXIT_GAME' || 'LOG_OUT':
            return initialState
        default:
            return state;
    }
}