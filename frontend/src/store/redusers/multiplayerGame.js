const initialState ={
    waitingForOpponent : false,
    dataIsLoading: false,
    gameDataLoaded : false,
    playerReady: false,
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
                data: action.payload
            }
        case 'GOT_A_WINNER': 
            return {
                ...state,
                winner: action.payload
            }
        case 'REMOVE_OPPONENT':
            return {
                ...state,
                opponent: null
            }
        case 'GAME_CANCELED':
            return {
                ...state,
                waitingForOpponent: false,
                playerReady: false,
                opponent: null
            }
        case 'EXIT_GAME' || 'LOG_OUT':
            return initialState
        default:
            return state;
    }
}